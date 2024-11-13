import Image from 'next/image'
import styles from './Home.module.css'
import { getTopCategories } from '@/utils/api'
import { Category } from '@/utils/interfaces'
import Link from 'next/link'
const HomePage = async() => {

  const categories = await getTopCategories()
  return (
    <div className={styles.container}>
      <section className={`${styles.section} ${styles.hero}`}>
        <h1><span>iHack</span> it like that!</h1>
        <p>Share your life hacks with others</p>
      </section>
      <section className={`${styles.section} ${styles.about}`}>
        
        <Image src="/logo3.png"  width={100} height={100} alt='Custom burger' unoptimized={true}/>
        <div>
        Welcome to iHack, the platform where you can share your creative life hacks with a community eager to learn and improve everyday life. Whether you're looking for tips to optimize your 
        work productivity, save time in the kitchen, or organize your home, iHack provides a space for people to share and discover useful tricks. Our mission is to help you live smarter, save resources, and make the most out of every day. Join us, share your best hacks, and learn from others!
         </div>
      </section>
      <section  className={`${styles.section} ${styles.popular}`}>
        <h2>Popular categories</h2>
        <div className={styles.categories}>
          {categories.map((category: Category) => (
            <Link key={category.id} className={styles.category} href={`/blogs/categories/${category.name}`}>
              <h3>{category.name}</h3>
            </Link>
          ))}
        </div>

      </section>
    </div>
  )
}

export default HomePage
