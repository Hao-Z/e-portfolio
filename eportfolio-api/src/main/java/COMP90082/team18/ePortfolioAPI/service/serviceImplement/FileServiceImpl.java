/*
    Referenced & modified according to threads in Stackoverflow like:
    https://stackoverflow.com/questions/35680932/download-a-file-from-spring-boot-rest-service
    ...
 */

package COMP90082.team18.ePortfolioAPI.service.serviceImplement;

import COMP90082.team18.ePortfolioAPI.service.FileService;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

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
        String fileName = getRandomString(7) + "-" + StringUtils.cleanPath(Objects.requireNonNull(file.getOriginalFilename()));
        Path dirLocation = Paths.get("./upload/" + id).toAbsolutePath().normalize();
        if (!Files.isDirectory(dirLocation)) Files.createDirectories(dirLocation);
        Path fileLocation = dirLocation.resolve(fileName);
        Files.copy(file.getInputStream(), fileLocation, StandardCopyOption.REPLACE_EXISTING);
        return fileName;
    }

    public Resource loadFile(Long id, String fileName) {
        try {
            Path filePath = Paths.get("./upload/" + id + "/" + fileName).toAbsolutePath().normalize();
            Resource resource = new UrlResource(filePath.toUri());
            if (resource.exists()) {
                return resource;
            } else {
                throw new NullPointerException("File not found " + fileName);
            }
        } catch (MalformedURLException e) {
            throw new NullPointerException("File not found " + fileName);
        }
    }

    private String getRandomString(int n) {
        String AlphaNumericString =
                "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
                        + "0123456789"
                        + "abcdefghijklmnopqrstuvxyz";
        StringBuilder stringBuilder = new StringBuilder(n);
        for (int i = 0; i < n; i++) {
            int index = (int) (AlphaNumericString.length() * Math.random());
            stringBuilder.append(AlphaNumericString.charAt(index));
        }
        return stringBuilder.toString();
    }
}
