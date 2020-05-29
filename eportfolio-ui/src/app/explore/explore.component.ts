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
    //TODO: take filter values from windows.SessionStorage.

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
        para = para + '&gender%5B%5D=' + g
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

