package com.project.auran.controller;

import com.project.auran.model.Company;
import com.project.auran.service.CompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "company")
public class CompanyController {

    private final CompanyService companyService;

    @Autowired
    public  CompanyController(CompanyService companyService){
        this.companyService = companyService;
    }

    @GetMapping
    public List<Company> getAllCompanies(){
        return companyService.getAllCompanies();
    }

    @GetMapping(path = "{companyId}")
    public Company getCompany(@PathVariable Long companyId){
        return companyService.getCompany(companyId);
    }

    @PostMapping(path = "{countryId}")
    public Company addNewCompany(@PathVariable Long countryId,
                                 @RequestBody Company company) {
        return companyService.addNewCompany(countryId, company);
    }

    @PutMapping(path = "{companyId}")
    public Company updateCompany(@PathVariable Long companyId,
                                 @RequestParam (required = false) String name,
                                 @RequestParam (required = false) String website,
                                 @RequestParam (required = false) Long countryId) {
        return companyService.updateCompany(companyId, name, website, countryId);
    }


    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    @DeleteMapping(path = "{companyId}")
    public void deleteCompany(@PathVariable Long companyId) {

        companyService.deleteCompany(companyId);
    }

}
