import { Component, OnInit } from '@angular/core';
import {NzFormatEmitEvent, NzTreeNodeOptions} from "ng-zorro-antd";
import * as globals from "../../global";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { RouterLink } from '@angular/router';
import { UniqueApiService } from 'src/app/core/services/unique-api.service';

@Component({
  selector: 'app-cvs',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css']
})
export class ExploreComponent implements OnInit {

  sharelink: string

  nodes: NzTreeNodeOptions[];
  nodes_str: any;

  width;
  searchValue = '';
  isCollapsed = window.innerWidth < Number(770);
  userDatas;
  pageNum: number = 0;
  pageSize: number = 10;
  totalPage: number = 1;
  CheckedIndustry: any = null;
  CheckedGender: any = null;
  order: string = null;
  Ascending : boolean;
  avartarUrl: string = "assets/untitled.png"

  constructor(
    private http: HttpClient,
    private apiService: UniqueApiService
  ) { }
  sortValues: any;
  gender_nodes: NzTreeNodeOptions[] = [
    {title: 'Male', key: '1', isLeaf: true, checked: false},
    {title: 'Female', key: '0', isLeaf: true, checked: false},
  ];

  ngOnInit(): void {
    if(window.innerWidth < Number(770)){
      this.width = "padding-left:0;";
    }else{
      this.width = " padding-left:256px;";
    }
    this.CheckedIndustry = null;
    this.sortValues = ['Age','Experience','Education'];
    this.Ascending = null;

    // <
    // this.getNodes();
    this.nodes_str = [
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
    ];
    this.nodes = [];
    for(let n of this.nodes_str){
      this.nodes.push({title: n['label'], key: n['label'], isLeaf: true, checked: false})
    }
    // > Delete

    this.getCVsData(this.pageNum.toString(),this.pageSize.toString(),this.CheckedIndustry,this.CheckedGender,this.order,this.Ascending);

    console.log(this.userDatas)
  }



  getOrder(event){
    if(event==null){
      this.order = event;
      this.Ascending = null
    } else if(event=='Age'){
      this.order = 'birthday';
      this.Ascending = false
    } else {
      this.order = event.toLowerCase();
      this.Ascending = false
    }
    this.getCVsData(this.pageNum.toString(),this.pageSize.toString(),this.CheckedIndustry,this.CheckedGender,this.order,this.Ascending);
  }

  nzCheckIndustry($event: NzFormatEmitEvent) {
    if($event.checkedKeys.length == 0){
      this.CheckedIndustry = null;
    }else{
      this.CheckedIndustry = [];
      for(let e of $event.checkedKeys){
        this.CheckedIndustry.push(e.key)
      }
    }
    this.getCVsData('0',this.pageSize.toString(),this.CheckedIndustry,this.CheckedGender,this.order,this.Ascending);
  }

  nzCheckGender($event: NzFormatEmitEvent) {
    if($event.checkedKeys.length == 0){
      this.CheckedGender = null;
    }else{
      this.CheckedGender = [];
      for(let e of $event.checkedKeys){
        this.CheckedGender.push(e.key)
      }
    }
    this.getCVsData('0',this.pageSize.toString(),this.CheckedIndustry,this.CheckedGender,this.order,this.Ascending);
  }

  clear() {
    this.CheckedIndustry = [];
    this.getCVsData('0',this.pageSize.toString(),this.CheckedIndustry,this.CheckedGender,this.order,this.Ascending);
  }

  changePage($event) {
    this.getCVsData(($event-1).toString(),this.pageSize.toString(),this.CheckedIndustry,this.CheckedGender,this.order,this.Ascending);
  }

  changeWidth() {
    if(window.innerWidth < Number(770)){
      this.width = "padding-left:0";
    }else{
      this.width = "padding-left:256px";
    }
  }

  getCVsData(pageNum='0', pageSize='10', industry:string[]=null, gender:string[]=null, orders:string=null, ascending:boolean=null) {
    const HttpOptions = {
      headers : new HttpHeaders({'content-Type': 'application/json'}
      )
    };

    //url parameters
    let para = 'pageNum='+pageNum+'&pageSize='+pageSize;
    if(industry!=null){
      for(let i of industry){
        i = i.replace(' ','%20');
        para = para+'&industry%5B%5D='+i;
      }
    }
    if(gender!=null){
      for(let g of gender){
        para = para + '&gender=%5B%5D' + g
      }
    }
    if(orders!=null){
      para = para+'&orders='+orders+'&ascending='+ascending.toString()
    }

    this.http.get<any>(globals.backend_path + "explore/filters?" + para, HttpOptions).subscribe((result) => {
      this.userDatas = [];
      for(let cv of result['content']){
        if (cv.profilePhoto) {
          this.avartarUrl = cv.profilePhoto;
        }
        cv['photo'] = this.avartarUrl
        this.userDatas.push(cv);
        console.log(cv)
      }
      this.pageNum = result['number'];
      this.pageSize = result['size'];
      this.totalPage = result['totalPages'];
      // console.log(this.userDatas)
    });
  }

  changeAscending() {
    this.Ascending = !this.Ascending;
    this.getCVsData(this.pageNum.toString(),this.pageSize.toString(),this.CheckedIndustry,this.CheckedGender,this.order,this.Ascending);
  }


  getLink(userID) {
    var url = "cv-show?link=" + userID;
    // window.open(url,"_self");
    window.location.href = url;
  }


  // getNodes() {
  //   refreshJwt();
  //   const HttpOptions = {
  //     headers : new HttpHeaders({'content-Type': 'application/json',
  //       'Authorization': localStorage.getItem("jwt_token")}
  //     )
  //   };
  //   this.http.get<any>(globals.backend_path + "explore/industries", HttpOptions).subscribe((result) => {
  //     this.nodes_str = [];
  //     for(let n of result['content']){
  //       this.nodes_str.push(n);
  //     }
  //   });
  // }
}

