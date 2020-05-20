package COMP90082.team18.ePortfolioAPI.service;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface FileService {

    String storeFile(Long id, MultipartFile file) throws IOException;

    Resource loadFileAsResource(Long id, String fileName);

}
