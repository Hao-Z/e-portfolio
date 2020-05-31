import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService{

  industryList = [
    { label: 'Accounting', value : '0' },
    { label: 'Airlines/Aviation', value:'1' },
    { label: 'Animation', value : '2' },
    { label: 'Apparel & Fashion', value : '3' },
    { label: 'Architecture & Planning', value : '4' },
    { label: 'Arts & Crafts', value : '5' },
    { label: 'Banking', value : '6' },
    { label: 'Biotechnology', value : '7' },
    { label: 'Broadcast Media', value : '8' },
    { label: 'Building Materials', value : '9' },
    { label: 'Business Supplies & Equipment', value : '10' },
    { label: 'Capital Markets', value : '11' },
    { label: 'Chemicals', value : '12' },
    { label: 'Civic & Social Organization', value : '13' },
    { label: 'Commercial Real Estate', value : '14' },
    { label: 'Computer & Network Security', value : '15' },
    { label: 'Computer Games', value : '16' },
    { label: 'Computer Hardware', value : '17' },
    { label: 'Computer Networking', value : '18' },
    { label: 'Computer Software', value : '19' },
    { label: 'Construction', value : '20' },
    { label: 'Consumer Electronics', value : '21' },
    { label: 'Consumer Goods', value : '22' },
    { label: 'Consumer Services', value : '23' },
    { label: 'Cosmetics', value : '24' },
    { label: 'Dairy', value : '25' },
    { label: 'Design', value : '26' },
    { label: 'E-learning', value : '27' },
    { label: 'Education Management', value : '28' },
    { label: 'Electrical &amp; Electronic Manufacturing', value : '29' },
    { label: 'Entertainment', value : '30' },
    { label: 'Environmental Services', value : '31' },
    { label: 'Events Services', value : '32' },
    { label: 'Executive Office', value : '33' },
    { label: 'Facilities Services', value : '34' },
    { label: 'Farming', value : '35' },
    { label: 'Financial Services', value : '36' },
    { label: 'Fine Art', value : '37' },
    { label: 'Fishery', value : '38' },
    { label: 'Food &amp; Beverages', value : '39' },
    { label: 'Food Production', value : '40' },
    { label: 'Fundraising', value : '41' },
    { label: 'Furniture', value : '42' },
    { label: 'Gambling & Casinos', value : '43' },
    { label: 'Glass, Ceramics & Concrete', value : '44' },
    { label: 'Government Administration', value : '45' },
    { label: 'Government Relations', value : '46' },
    { label: 'Health, Wellness & Fitness', value : '47' },
    { label: 'Services', value : '48' },
    { label: 'Information Technology', value : '49' },
    { label: 'Information Technology & Services', value : '50' },
    { label: 'Insurance', value : '51' },
    { label: 'International Trade & Development', value : '52' },
    { label: 'Internet', value : '53' },
    { label: 'Mechanical or Industrial Engineering', value : '54' },
    { label: 'Media Production', value : '55' },
    { label: 'Medical Device', value : '56' },
    { label: 'Medical Practice', value : '57' },
    { label: 'Mental Health Care', value : '58' },
    { label: 'Military', value : '59' },
    { label: 'Mining & Metals', value : '60' },
    { label: 'Motion Pictures & Film', value : '61' },
    { label: 'Museums & Institutions', value : '62' },
    { label: 'Music', value : '63' },
    { label: 'Nanotechnology', value : '64' },
    { label: 'Newspapers', value : '65' },
    { label: 'Non-profit Organization Management', value : '66' },
    { label: 'Oil & Energy', value : '67' },
    { label: 'Online Media', value : '68' },
    { label: 'Outsourcing/Offshoring', value : '69' },
    { label: 'Package/Freight Delivery', value : '70' },
    { label: 'Packaging & Containers', value : '71' },
    { label: 'Paper & Forest Products', value : '72' },
    { label: 'Performing Arts', value : '73' },
    { label: 'Pharmaceuticals', value : '74' },
    { label: 'Philanthropy', value : '75' },
    { label: 'Photography', value : '76' },
    { label: 'Plastics', value : '77' },
    { label: 'Political Organization', value : '78' },
    { label: 'Primary/Secondary Education', value : '79' },
    { label: 'Printing', value : '80' },
    { label: 'Professional Training & Coaching', value : '81' },
    { label: 'Program Development', value : '82' },
    { label: 'Public Policy', value : '83' },
    { label: 'Public Relations & Communications', value : '84' },
    { label: 'Public Safety', value : '85' },
    { label: 'Publishing', value : '86' },
    { label: 'Railroad Manufacture', value : '87' },
    { label: 'Ranching', value : '88' },
    { label: 'Real Estate', value : '89' },
    { label: 'Recreational Facilities & Services', value : '90' },
    { label: 'Religious Institutions', value : '91' },
    { label: 'Renewables & Environment', value : '92' },
    { label: 'Research', value : '93' },
    { label: 'Restaurants', value : '94' },
    { label: 'Retail', value : '95' },
    { label: 'Security & Investigations', value : '96' },
    { label: 'Semiconductors', value : '97' },
    { label: 'Shipbuilding', value : '98' },
    { label: 'Sporting Goods', value : '99' },
    { label: 'Sports', value : '100' },
    { label: 'Staffing & Recruiting', value : '101' },
    { label: 'Supermarkets', value : '102' },
    { label: 'Telecommunications', value : '103' },
    { label: 'Textiles', value : '104' },
    { label: 'Think Tanks', value : '105' },
    { label: 'Tobacco', value : '106' },
    { label: 'Translation & Localization', value : '107' },
    { label: 'Transportation/Trucking/Railroad', value : '108' },
    { label: 'Utilities', value : '109' },
    { label: 'Venture Capital & Private Equity', value : '110' },
    { label: 'Veterinary', value : '111' },
    { label: 'Warehousing', value : '112' },
    { label: 'Wholesale', value : '113' },
    { label: 'Wine & Spirits', value : '114' },
    { label: 'Writing & Editing', value : '115'}
  ]

  degreeList = [
    { value: '1', label: 'Less than a high school diploma' },
    { value: '2', label: 'High school graduate' },
    { value: '3', label: 'College with no degree' },
    { value: '4', label: 'Professional certificate (career school)' },
    { value: '5', label: 'Associate degree (academic program)' },
    { value: '6', label: 'Bachelor\'s degree' },
    { value: '7', label: 'Master\'s degree' },
    { value: '8', label: 'Doctoral degree (e.g., PH.D.)' },
    { value: '9', label: 'Professional degree (e.g., M.D.)' }
  ]

  genderList = [
    { value: '0', label: 'Female' },
    { value: '1', label: 'Male' },
    { value: '2', label: 'Keep Secret' },
  ]

  emplogymentTypeList = [
    { value: '1', label: 'Full-time' },
    { value: '2', label: 'Part-time' },
    { value: '3', label: 'Self-employed' },
    { value: '4', label: 'Freelance' },
    { value: '5', label: 'Contract' },
    { value: '6', label: 'Internship' },
    { value: '7', label: 'Apprenticeship' },
  ]

  proficiencyList = [
    { value: '1', label: 'Elementary proficiency' },
    { value: '2', label: 'Limited working proficiency' },
    { value: '3', label: 'Professional working proficiency' },
    { value: '4', label: 'Full professional proficiency' },
    { value: '5', label: 'Native or bilingual proficiency' }
  ]

  unitList = [
    { value: '86400000', label: 'days' },
    { value: '3600000', label: 'hours' },
    { value: '60000', label: 'minutes' },
    { value: '1000', label: 'seconds' },
  ]

  constructor() { }

  getIndustryList() {
    return this.industryList
  }

  getIndustry() {
    return of(this.industryList)
  }

  getGender() {
    return of(this.genderList)
  }

  getDegree() {
    return of(this.degreeList)
  }

  getProficiency() {
    return of(this.proficiencyList)
  }

  getEmplogymentType() {
    return of(this.emplogymentTypeList)
  }

  getUnit() {
    return of(this.unitList)
  }

  getLabel(currValue: string, dataclass: string): string {
    if (!currValue) {
      return "";
    }
    var targetList = [];
    switch (dataclass) {
      case "industry":
        targetList = this.industryList;
        break;
      case "degree":
        targetList = this.degreeList;
        break;
      case "gender":
        targetList = this.genderList;
        break;
      case "emplogymentType":
        targetList = this.emplogymentTypeList;
        break;
      case "proficiency":
        targetList = this.proficiencyList;
        break;
    }
    var currItem = targetList.filter(each => each.value === currValue).pop();
    return currItem ? currItem.label : null;
  }

}
