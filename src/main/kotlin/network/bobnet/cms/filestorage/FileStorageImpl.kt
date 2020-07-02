package network.bobnet.cms.filestorage

import org.slf4j.Logger
import java.nio.file.Files
import java.nio.file.Path
import java.nio.file.Paths
import java.util.stream.Stream

import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Value
import org.springframework.core.io.Resource
import org.springframework.core.io.UrlResource
import org.springframework.stereotype.Service
import org.springframework.util.FileSystemUtils
import org.springframework.web.multipart.MultipartFile
import java.lang.RuntimeException

@Service
class FileStorageImpl(vararg subDir: String = arrayOf()): FileStorage{

    val log: Logger = LoggerFactory.getLogger(this::class.java)

    @Value("\${file.storage.root}")
    private lateinit var root: String
    private val sDir = subDir
    var location: Path = if(subDir.isEmpty()){
        Paths.get(root)
    }else{
        Paths.get(root, *subDir)
    }


    override fun store(file: MultipartFile): String{
        val extendedFile = ExtendedFile(file)

        Files.copy(file.inputStream, this.location.resolve(extendedFile.fullName))
        return getLocationString(extendedFile.fullName)
    }

    private fun getLocationString(fileName: String = ""): String{
        val location: StringBuilder = StringBuilder()
        location.append("/").append(root)
        if(sDir.isEmpty()){
            location.append("/")
        }else{
            sDir.forEach {
                location.append("/").append(it)
            }
            location.append("/")
        }

        if(fileName.isNotEmpty()){
            location.append(fileName)
        }

        return location.toString()
    }

    override fun loadFile(filename: String): Resource {
        val file = location.resolve(filename)
        val resource = UrlResource(file.toUri())

        if(resource.exists() || resource.isReadable){
            return resource
        }else{
            log.error("No souche file, or no readable!")
            throw RuntimeException("FAIL!")
        }
    }

    override fun deleteAll() {
        FileSystemUtils.deleteRecursively(location.toFile())
    }

    override fun init() {
        Files.createDirectory(location)
    }

    override fun loadFiles(): Stream<Path> {
        return Files.walk(this.location, 1).filter{path -> path != this.location }.map(this.location::relativize)
    }
}