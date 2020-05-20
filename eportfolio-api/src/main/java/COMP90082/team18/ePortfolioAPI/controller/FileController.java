/*
    Referenced & modified according to threads in Stackoverflow like:
    https://stackoverflow.com/questions/35680932/download-a-file-from-spring-boot-rest-service
    ...
 */

package COMP90082.team18.ePortfolioAPI.controller;

import COMP90082.team18.ePortfolioAPI.service.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@RestController
public class FileController {

    @Autowired
    FileService fileService;

    @PostMapping("/upload/{id}")
    public Map<String, String> upload(@PathVariable Long id, @RequestParam("file") MultipartFile file) {
        String fileName;
        try {
             fileName = fileService.saveFile(id, file);
        }
        catch (IOException e){
            e.printStackTrace();
            throw new RuntimeException("Unexpected Error, uploading failed");
        }
        Map<String, String> result = new HashMap<>();
        result.put("url", String.format(id + "/" + fileName));
        result.put("uid", id.toString());
        result.put("name", fileName);
        return result;
    }

    @GetMapping("/download/{id}/{file}")
    public ResponseEntity<Resource> download(@PathVariable Long id, @PathVariable String file) {
        Resource resource = fileService.loadFile(id, file);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(resource);

    }
}
