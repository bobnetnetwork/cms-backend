package network.bobnet.cms.service

import network.bobnet.cms.model.content.Article
import network.bobnet.cms.repository.content.ArticleRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

@Service
class ArticleService{

    @Autowired
    private lateinit var articleRepository: ArticleRepository

    private fun existsById(id: Long): Boolean {
        return articleRepository.existsById(id)
    }

    fun findById(id: Long): Article? {
        return articleRepository.findById(id).orElse(null)
    }

    fun findBySlug(slug: String): Article {
        return articleRepository.findBySlug(slug)
    }

    fun findAll(pageNumber: Int, rowNumber: Int): MutableList<Article>{
        var articles: MutableList<Article> = mutableListOf<Article>()
        var sortedByLastUpdateDesc : Pageable

        sortedByLastUpdateDesc = PageRequest.of(pageNumber -1, rowNumber, Sort.by("id").ascending())
        articleRepository.findAll(sortedByLastUpdateDesc).forEach{
            articles.add(it)
        }

        return articles
    }

    fun save(article: Article): Article{
        if(article.title.isEmpty()){
            throw Exception("Title is required")
        }
        if(article.content.isEmpty()){
            throw Exception("Content is required")
        }
        if(article.id != null && existsById(article.id!!)){
            throw Exception("Article with id: " + article.id + " already exists")
        }
        return articleRepository.save(article)
    }

    fun update(article: Article){
        if(article.title.isEmpty()){
            throw Exception("Title is required")
        }
        if(article.content.isEmpty()){
            throw Exception("Content is required")
        }
        if(!existsById(article.id!!)){
            throw Exception("Cannot find Article with id: " + article.id)
        }
        articleRepository.save(article)
    }

    fun deleteById(id: Long){
        if(!existsById(id)){
            throw Exception("Cannot find Article with id: $id")
        }else {
            articleRepository.deleteById(id)
        }
    }

    fun count(): Long{
        return articleRepository.count()
    }
}