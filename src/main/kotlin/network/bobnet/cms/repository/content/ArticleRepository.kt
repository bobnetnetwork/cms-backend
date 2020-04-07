package network.bobnet.cms.repository.content

import network.bobnet.cms.model.content.Article
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository

@Repository
interface ArticleRepository : CrudRepository<Article, Long> {
    fun findBySlug(slug: String): Article?
    fun findAllByOrderByAddedAtDesc(): Iterable<Article>
    fun findByCategoryIds(categorID: Long): Iterable<Article>
}