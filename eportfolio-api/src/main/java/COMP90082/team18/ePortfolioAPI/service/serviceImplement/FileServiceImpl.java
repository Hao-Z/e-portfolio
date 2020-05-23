/*
    Referenced & modified according to threads in Stackoverflow like:
    https://stackoverflow.com/questions/35680932/download-a-file-from-spring-boot-rest-service
    ...
 */

package COMP90082.team18.ePortfolioAPI.service.serviceImplement;

import COMP90082.team18.ePortfolioAPI.service.FileService;
import COMP90082.team18.ePortfolioAPI.util.ApplicationContextProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.Null;
import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Objects;

@Service
public class FileServiceImpl implements FileService {

    public String saveFile(Long id, MultipartFile file) throws IOException {
        String fileName = StringUtils.cleanPath(Objects.requireNonNull(file.getOriginalFilename()));
        Path dirLocation = Paths.get("./upload/" + id).toAbsolutePath().normalize();
        if(!Files.isDirectory(dirLocation)) Files.createDirectories(dirLocation);
        Path fileLocation = dirLocation.resolve(fileName);
        Files.copy(file.getInputStream(), fileLocation, StandardCopyOption.REPLACE_EXISTING);
        return fileName;
    }

    public Resource loadFile(Long id, String fileName) {
        try {
            Path filePath = Paths.get("./upload/" + id + "/" + fileName).toAbsolutePath().normalize();
            Resource resource = new UrlResource(filePath.toUri());
            if(resource.exists()) {
                return resource;
            } else {
                throw new NullPointerException("File not found " + fileName);
            }
        } catch (MalformedURLException e) {
            throw new NullPointerException("File not found " + fileName);
        }
    }
}
