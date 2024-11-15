
import { fetchRecentLikedPosts, fetchRecentCommentedPosts, fetchRecentCreatedPosts, fetchRecentBlogs, fetchRecentPosts, fetchPopularPosts } from "@/utils/api";
import { Blog } from "./interfaces";
import { auth } from "@/auth";

export async function getContentBasedRecommendations(): Promise<Blog[]> {
    const session = await auth();
    if(!session || !session.user || !session.user.id){
        return []
    }
    // console.log("SESSION:",session.user.id)
    try {
        // Fetch recent liked, commented, and created posts
        const [recentLikedPosts, recentCommentedPosts, recentCreatedPosts] = await Promise.all([
            fetchRecentLikedPosts(session.user.id),
            fetchRecentCommentedPosts(session.user.id),
            fetchRecentCreatedPosts(session.user.id),
        ]);

        const recentLikedPostsSafe = recentLikedPosts ?? []
        const recentCommentedPostsSafe = recentCommentedPosts ?? []
        const recentCreatedPostsSafe = recentCreatedPosts ?? []

        console.log('recentLikedPosts:', recentLikedPostsSafe);
        console.log('recentCommentedPosts:', recentCommentedPostsSafe);
        console.log('recentCreatedPosts:', recentCreatedPostsSafe);    
        
        const recentInteractions: Blog[] = [
            ...recentLikedPostsSafe,
            ...recentCommentedPostsSafe,
            ...recentCreatedPostsSafe,
        ];
        
        console.log(recentInteractions)
        // Create sets to store unique categories and tags
        const categorySet = new Set<string>();
        const tagSet = new Set<string>();


        recentInteractions.forEach((post) => {
            // Collect unique categories
            console.log("Post", post)
            if (post.category?.name) categorySet.add(post.category.name);
            // Collect unique tags, split and trimmed
            if (post.tags) {
                post.tags.split(' ').forEach((tag) => tagSet.add(tag.trim()));
            }
        });

        console.log("Categry: ", categorySet)
        console.log("Tags: ", tagSet)

        // Fetch recent posts (to be filtered and scored)
        const recentPosts: Blog[] = await fetchRecentPosts(10);
        // console.log('recentPosts:', recentPosts);
        if (!recentPosts || recentPosts.length === 0) {
            console.warn("No recent posts available for recommendations.");
            return [];
        }

        // Score posts by similarity
        let scoredPosts = recentPosts
            // Exclude posts that the user already interacted with
            .filter((post) => post && !recentInteractions.some((interacted) => interacted.id === post.id))
            .map((post) => {
                
                const postTagsArray = post.tags ? post.tags.split(' ').map((tag) => tag.trim()) : [];
                const tagMatches = postTagsArray.filter((tag) => tagSet.has(tag)).length;
                console.log(categorySet)
                const categoryMatch = post.category?.name && categorySet.has(post.category.name) ? 1 : 0;
                console.log(categoryMatch)

                // Calculate the similarity score based on tag and category matches
                const similarityScore = tagMatches + categoryMatch;
                console.log("Similarity score", similarityScore)


                return { post, similarityScore };
            })
            .filter(({ similarityScore }) => similarityScore > 0)
            .sort((a, b) => b.similarityScore - a.similarityScore)
            .map(({ post }) => post);

            const minRecommendations =  6;
            console.log(scoredPosts)
            if(scoredPosts.length < minRecommendations){
                const addPopular = await fetchPopularPosts(minRecommendations + scoredPosts.length);
                // const filteredPopular = addPopular.filter((addPost: Blog) => {
                //     return !scoredPosts.some((scoredPost) => {
                       
                //         scoredPost.id === addPost.id
                //     })
                // })
                const filteredPopular = addPopular.filter((addPost: Blog) => 
                    
                    !scoredPosts.some((scoredPost) => {
                        console.log(scoredPost.id, " === ", addPost.id, ": ",   scoredPost.id === addPost.id)
                        return scoredPost.id === addPost.id})
                );
                console.log(filteredPopular)
                scoredPosts.push(...filteredPopular);
                scoredPosts = scoredPosts.slice(0, minRecommendations);
            }

        return scoredPosts;
    } catch (error) {
        console.error("Error in getContentBasedRecommendations:", error);
        return [];
    }
}