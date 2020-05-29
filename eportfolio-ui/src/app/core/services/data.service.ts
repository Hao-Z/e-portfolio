import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  getIndustry() { 
    return of([
      { label: "Computer Games", value: "Computer Games" },
      { label: "Computer Hardware", value: "Computer Hardware" },
      { label: "Computer Networking", value: "Computer Networking" },
      { label: "Computer Software", value: "Computer Software" },
      { label: "Information Technology", value: "Information Technology" },
      { label: "Accounting", value: "Accounting" },
      { label: "Airlines/Aviation", value: "Airlines/Aviation" },
      { label: "Animation", value: "Animation" },
      { label: "Apparel & Fashion", value: "Apparel & Fashion" },
      { label: "Architecture & Planning", value: "Architecture & Planning" },
      { label: "Arts & Crafts", value: "Arts & Crafts" },
      { label: "Banking", value: "Banking" }, 
      { label: "Biotechnology", value: "Biotechnology" }, 
      { label: "Broadcast Media", value: "Broadcast Media" }, 
      { label: "Building Materials", value: "Building Materials" }, 
      { label: "Business Supplies & Equipment", value: "Business Supplies & Equipment" }, 
      { label: "Capital Markets", value: "Capital Markets" }, 
      { label: "Chemicals", value: "Chemicals" }, 
      { label: "Civic & Social Organization", value: "Civic & Social Organization" }, 
      { label: "Commercial Real Estate", value: "Commercial Real Estate" }, 
      { label: "Computer & Network Security", value: "Computer & Network Security" }, 
      { label: "Computer Games", value: "Computer Games" }, 
      { label: "Computer Hardware", value: "Computer Hardware" }, 
      { label: "Computer Networking", value: "Computer Networking" }, 
      { label: "Computer Software", value: "Computer Software" }, 
      { label: "Construction", value: "Construction" }, 
      { label: "Consumer Electronics", value: "Consumer Electronics" }, 
      { label: "Consumer Goods", value: "Consumer Goods" }, 
      { label: "Consumer Services", value: "Consumer Services" }, 
      { label: "Cosmetics", value: "Cosmetics" }, 
      { label: "Dairy", value: "Dairy" }, 
      { label: "Design", value: "Design" }, 
      { label: "E-learning", value: "E-learning" }, 
      { label: "Education Management", value: "" }, 
      { label: "Electrical &amp; Electronic Manufacturing", value: "Education Management" },
      { label: "Entertainment", value: "Entertainment" }, 
      { label: "Environmental Services", value: "Environmental Services" }, 
      { label: "Events Services", value: "Events Services" }, 
      { label: "Executive Office", value: "Executive Office" }, 
      { label: "Facilities Services", value: "Facilities Services" }, 
      { label: "Farming", value: "Farming" }, 
      { label: "Financial Services", value: "Financial Services" }, 
      { label: "Fine Art", value: "Fine Art" }, 
      { label: "Fishery", value: "Fishery" }, 
      { label: "Food &amp; Beverages", value: "Food &amp; Beverages" }, 
      { label: "Food Production", value: "Food Production" }, 
      { label: "Fundraising", value: "Fundraising" }, 
      { label: "Furniture", value: "Furniture" }, 
      { label: "Gambling & Casinos", value: "Gambling & Casinos" }, 
      { label: "Glass, Ceramics & Concrete", value: "Glass, Ceramics & Concrete" }, 
      { label: "Government Administration", value: "Government Administration" }, 
      { label: "Government Relations", value: "Government Relations" }, 
      { label: "Health, Wellness & Fitness", value: "Health, Wellness & Fitness" }, 
      { label: "Services", value: "Services" }, 
      { label: "Information Technology & Services", value: "Information Technology & Services" }, 
      { label: "Insurance", value: "Insurance" }, 
      { label: "International Trade & Development", value: "International Trade & Development" }, 
      { label: "Internet", value: "Interne" }, 
      { label: "Mechanical or Industrial Engineering", value: "Mechanical or Industrial Engineering" }, 
      { label: "Media Production", value: "Media Production" }, 
      { label: "Medical Device", value: "Medical Device" }, 
      { label: "Medical Practice", value: "Medical Practice" }, 
      { label: "Mental Health Care", value: "Mental Health Care" }, 
      { label: "Military", value: "Military" }, 
      { label: "Mining & Metals", value: "Mining & Metals" }, 
      { label: "Motion Pictures & Film", value: "Motion Pictures & Film" }, 
      { label: "Museums & Institutions", value: "Museums & Institutions" }, 
      { label: "Music", value: "Music" }, 
      { label: "Nanotechnology", value: "Nanotechnology" }, 
      { label: "Newspapers", value: "Newspapers" }, 
      { label: "Non-profit Organization Management", value: "Non-profit Organization Management" }, 
      { label: "Oil & Energy", value: "Oil & Energy" }, 
      { label: "Online Media", value: "Online Media" }, 
      { label: "Outsourcing/Offshoring", value: "Outsourcing/Offshoring" }, 
      { label: "Package/Freight Delivery", value: "Package/Freight Delivery" }, 
      { label: "Packaging & Containers", value: "Packaging & Containers" }, 
      { label: "Paper & Forest Products", value: "Paper & Forest Products" }, 
      { label: "Performing Arts", value: "Performing Arts" }, 
      { label: "Pharmaceuticals", value: "Pharmaceuticals" }, 
      { label: "Philanthropy", value: "Philanthropy" }, 
      { label: "Photography", value: "Photography" }, 
      { label: "Plastics", value: "Plastics" }, 
      { label: "Political Organization", value: "Political Organization" }, 
      { label: "Primary/Secondary Education", value: "Primary/Secondary Education" }, 
      { label: "Printing", value: "Printing" }, 
      { label: "Professional Training & Coaching", value: "Professional Training & Coaching" }, 
      { label: "Program Development", value: "Program Development" }, 
      { label: "Public Policy", value: "Public Policy" }, 
      { label: "Public Relations & Communications", value: "Public Relations & Communications" }, 
      { label: "Public Safety", value: "Public Safety" }, 
      { label: "Publishing", value: "Publishing" }, 
      { label: "Railroad Manufacture", value: "Railroad Manufacture" }, 
      { label: "Ranching", value: "Ranching" }, 
      { label: "Real Estate", value: "Real Estate" }, 
      { label: "Recreational Facilities & Services", value: "Recreational Facilities & Services" }, 
      { label: "Religious Institutions", value: "Religious Institutions" }, 
      { label: "Renewables & Environment", value: "Renewables & Environment" }, 
      { label: "Research", value: "Research" }, 
      { label: "Restaurants", value: "Restaurants" }, 
      { label: "Retail", value: "Retail" }, 
      { label: "Security & Investigations", value: "Security & Investigations" }, 
      { label: "Semiconductors", value: "Semiconductors" }, 
      { label: "Shipbuilding", value: "Shipbuilding" }, 
      { label: "Sporting Goods", value: "Sporting Goods" }, 
      { label: "Sports", value: "Sports" }, 
      { label: "Staffing & Recruiting", value: "Staffing & Recruiting" }, 
      { label: "Supermarkets", value: "Supermarkets" }, 
      { label: "Telecommunications", value: "Telecommunications" }, 
      { label: "Textiles", value: "Textiles" }, 
      { label: "Think Tanks", value: "Think Tanks" }, 
      { label: "Tobacco", value: "Tobacco" }, 
      { label: "Translation & Localization", value: "Translation & Localization" }, 
      { label: "Transportation/Trucking/Railroad", value: "Transportation/Trucking/Railroad" }, 
      { label: "Utilities", value: "Utilities" }, 
      { label: "Venture Capital & Private Equity", value: "Venture Capital & Private Equity" }, 
      { label: "Veterinary", value: "Veterinary" }, 
      { label: "Warehousing", value: "Warehousing" }, 
      { label: "Wholesale", value: "Wholesale" }, 
      { label: "Wine & Spirits", value: "Wine & Spirits" }, 
      { label: "Writing & Editing", value: "Writing & Editing" } 
    ])
  }

  getGender() {
    return of([
      { value: 'MALE', label: 'Male' },
      { value: 'FEMALE', label: 'Female' },
      { value: 'OTHER', label: 'Other' },
    ])
  }

  getDegree() {
    return of([
      { value: 'Less than a high school diploma', label: 'Less than a high school diploma' },
      { value: 'High school graduate', label: 'High school graduate' },
      { value: 'College with no degree', label: 'College with no degree' },
      { value: 'Professional certificate (career school)', label: 'Professional certificate (career school)' },
      { value: 'Associate degree (academic program)', label: 'Associate degree (academic program)' },
      { value: 'Bachelor\'s degree', label: 'Bachelor\'s degree' },
      { value: 'Master\'s degree', label: 'Master\'s degree' },
      { value: 'Doctoral degree (e.g., PH.D.)', label: 'Doctoral degree (e.g., PH.D.)' },
      { value: 'Professional degree (e.g., M.D.)', label: 'Professional degree (e.g., M.D.)' }
    ])
  }

  getProficiency() {
    return of([
      { value: 'Elementary proficiency', label: 'Elementary proficiency' },
      { value: 'Limited working proficiency', label: 'Limited working proficiency' },
      { value: 'Professional working proficiency', label: 'Professional working proficiency' },
      { value: 'Full professional proficiency', label: 'Full professional proficiency' },      
      { value: 'Native or bilingual proficiency', label: 'Native or bilingual proficiency' }
    ])
  }

  getEmplogymentType() {
    return of([
      { value: 'Full-time', label: 'Full-time' },
      { value: 'Part-time', label: 'Part-time' },
      { value: 'Self-employed', label: 'Self-employed' },
      { value: 'Freelance', label: 'Freelance' },
      { value: 'Contract', label: 'Contract' },
      { value: 'Internship', label: 'Internship' },
      { value: 'Apprenticeship', label: 'Apprenticeship' },      
    ])
  }

}
