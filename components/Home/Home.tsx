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
        <h1><span>iLike</span> it like that!</h1>
        <p>Share your custom cravings with others</p>
      </section>
      <section className={`${styles.section} ${styles.about}`}>
        
        <Image src="/logo3.png"  width={100} height={100} alt='Custom burger' unoptimized={true}/>
        <div>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Unde, quaerat facilis labore tenetur nulla necessitatibus! Numquam quisquam, esse minima quaerat delectus accusantium officiis ipsam fugiat quasi aspernatur reprehenderit. Iste, maxime!
          Sit incidunt modi ab eum, eius soluta voluptas deleniti ratione vel omnis quas, nobis ullam saepe? Provident nisi aliquid numquam, placeat quae distinctio nemo, harum dolores non minus maxime minima.
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
