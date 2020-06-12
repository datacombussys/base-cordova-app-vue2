import { f7 } from 'framework7-vue';
import store from "@/js/store/store";

//Admin Pages
import Admin from '../pages/datacom/admin.vue';

//Common 
import HomePage from '../pages/home.vue';
import AboutPage from '../pages/about.vue';
import NotFoundPage from '../pages/404.vue';
import LoginPage from '../pages/common/login.vue';
import PasswordReset from '../pages/common/password-reset.vue';

//Company Pages
import Datacom from '../pages/datacom/supercompany.vue';
import PartnerProfile from '../pages/partners/partnerprofile.vue';
import VendorProfile from '../pages/vendors/vendorprofile.vue';
import CompanyProfile from '../pages/companies/companyprofile.vue';
import LeadProfile from '../pages/leads/leadprofile.vue';
import SalesOffice from '../pages/sales-offices/salesofficeprofile.vue';
import Warehouse from '../pages/warehouses/warehouseprofile.vue';
import setup from '../pages/setup/setup.vue';

//Time and Attendance
import timeAttendance from '../pages/time-attendance/consolidated-time-cards.vue';
import attendanceSettings from '../pages/time-attendance/settings.vue';
import clockScreen from '../pages/time-attendance/clock-screen.vue';
import workSchedule from '../pages/time-attendance/work-schedule-calendar.vue';
import leaveRequest from '../pages/time-attendance/leave-request.vue';
import attendanceReports from '../pages/time-attendance/attendance-reports.vue';

//Gift Cards
import giftCards from '../pages/databoxx-cards/gift-cards.vue';
import databoxxCards from '../pages/databoxx-cards/databoxx-cards.vue';

//Inventory Pages
import RetailPOS from '../pages/pos/retailpos.vue';
import Inventory from '../pages/inventory/inventory.vue';
import RestaurantPOS from '../pages/pos/restaurantpos.vue';
import KitchenScreen from '../pages/pos/kitchen-screen.vue';
import Kanban from '../pages/pos/kanban.vue';
import POSLogin from '../pages/pos/pos-login.vue';

//Transactions Pages
import HostedPmtPage from '../pages/vt_hpp/hosted_payment.vue';
import VirtualTerminal from '../pages/vt_hpp/virtual_terminal.vue';
import BatchReport from '../pages/vt_hpp/batch-reporting.vue';
import TransactionReport from '../pages/vt_hpp/transaction-reporting.vue';
import RecurringContracts from '../pages/vt_hpp/recurring-contracts.vue';
import FloorPlan from '../pages/pos/floorplan.vue';
import SignaturePad from '../pages/pos/signature-pad.vue';
import LabelMaker from '../pages/inventory/label-maker.vue';
import LabelMerge from '../pages/inventory/label-merge.vue';

//User Pages
import CustomerProfile from '../pages/customers/customerprofile.vue';
import CustomerRegistration from '../pages/customers/customer-registration.vue';
import UserProfile from '../pages/users/userprofile.vue';
import userCalendar from '../pages/calendar/user-calendar.vue';
import usersGroups from '../pages/users/users-groups.vue';
import groupsPermissions from '../pages/users/groups-permissions.vue';


//Communication Pages
import userEmail from '../pages/communication/email.vue';
import textMessage from '../pages/communication/text-message.vue';
import Chat from '../pages/communication/chat.vue';
import chatLobby from '../pages/communication/chat-lobby.vue';

import DragDrop from '../pages/drag-n-drop/keditor.vue';

//Auth Only Routes
function checkAuth(to, from, resolve, reject) {
  if (store._modules.root.state.Auth.isAuthenticated) {
    resolve(to);
  } else {
    reject();
    var router = this;
    console.log('router', router);
    console.log('to', to);
    console.log('from', from);
    store._modules.root.state.Auth.preLoginPagePath = to.path;
    router.navigate('/login/');

  }
}



// function checkPermission(to, from, resolve, reject) {
//   if (/* some condition to check user edit permission */) {
//     resolve();
//   } else {
//     reject();
//   }
// }


var routes = [
  //Common Pages
  {
    path: '/',
    component: HomePage,
  },
  {
    path: '/login',
    component: LoginPage,

  },
  {
    path: '/password-reset/:email',
    component: PasswordReset,

  },
  {
    path: '/secured',
    async(to, from, resolve, reject) {
      var router = this;
      if (store._modules.root.state.Auth.isAuthenticated) {
        router.navigate(store._modules.root.state.Auth.preLoginPagePath);
        console.log('store._modules.root.state.Auth.preLoginPagePath', store._modules.root.state.Auth.preLoginPagePath);
        resolve({redirect: store._modules.root.state.Auth.preLoginPagePath});
        
      } else {
        reject({
          component: LoginPage,
        });
      }
    },
  },
  {
    path: '/about/',
    component: AboutPage,
  },
  //Admin Page
  {
    path: '/admin/',
    component: Admin,
    // beforeEnter: checkAuth,
  },
  //Company Pages
  {
    path: '/datacom/',
    component: Datacom,
    // beforeEnter: checkAuth,
  },
  {
    path: '/partnerprofile/',
    component: PartnerProfile,
    // beforeEnter: checkAuth,
  },
  {
    path: '/companyprofile/',
    component: CompanyProfile,
    // beforeEnter: checkAuth,
  },
  {
    path: '/salesoffice/',
    component: SalesOffice,
    // beforeEnter: checkAuth,
  },
  {
    path: '/warehouse/',
    component: Warehouse,
    // beforeEnter: checkAuth,
  },
  {
    path: '/setup/',
    component: setup,
    // beforeEnter: checkAuth,
  },
  {
    path: '/vendorprofile/',
    component: VendorProfile,
    // beforeEnter: checkAuth,
  },
  {
    path: '/leadprofile/',
    component: LeadProfile,
  },
  //User Pages
  {
    path: '/userprofile/',
    component: UserProfile,
    // beforeEnter: checkAuth,
  },
  {
    path: '/customerprofile/',
    component: CustomerProfile,
    // beforeEnter: checkAuth,
  },
  {
    path: '/registration/',
    component: CustomerRegistration,
  },
  {
    path: '/usercalendar/',
    component: userCalendar,
    // beforeEnter: checkAuth,
  },
  {
    path: '/users-groups/',
    component: usersGroups,
    // beforeEnter: checkAuth,
  },
  {
    path: '/groups-permissions/',
    component: groupsPermissions,
    // beforeEnter: checkAuth,
  },
  //Attendance
  {
    path: '/time-card/',
    component: timeAttendance,
    // beforeEnter: checkAuth,
  },
  {
    path: '/attendance-settings/',
    component: attendanceSettings,
    // beforeEnter: checkAuth,
  },
  {
    path: '/clock-screen/',
    component: clockScreen,
    // beforeEnter: checkAuth,
  },
  {
    path: '/work-schedule/',
    component: workSchedule,
    // beforeEnter: checkAuth,
  },
  {
    path: '/leave-request/',
    component: leaveRequest,
    // beforeEnter: checkAuth,
  },
  {
    path: '/attendance-reports/',
    component: attendanceReports,
    // beforeEnter: checkAuth,
  },
  //Communication Pages
  {
    path: '/email/',
    component: userEmail,
    // beforeEnter: checkAuth,
  },
  {
    path: '/textmessage/',
    component: textMessage,
    // beforeEnter: checkAuth,
  },
  {
    path: '/lobby/',
    component: chatLobby,
    // beforeEnter: checkAuth,
  },
  {
    path: '/chat-app/:room',
    component: Chat,
    // beforeEnter: checkAuth,
},
  //POS Application
  {
    path: '/retailpos/',
    component: RetailPOS,
    // beforeEnter: checkAuth,
  },
  {
    path: '/kitchen-screen/',
    component: KitchenScreen,
  },
  {
    path: '/kanban/',
    component: Kanban,
  },
  {
    path: '/floorplan/',
    component: FloorPlan,
    // beforeEnter: checkAuth,
  },
   {
    path: '/restaurantpos/',
    component: RestaurantPOS,
    // beforeEnter: checkAuth,
  },
  {
    path: '/pos-login/',
    component: POSLogin,
  },
  //Inventory Management
  {
    path: '/labelmaker/',
    component: LabelMaker,
    // beforeEnter: checkAuth,
  },
  {
    path: '/inventory/',
    component: Inventory,
    // beforeEnter: checkAuth,
  },
  {
    path: '/merge-labels/',
    component: LabelMerge,
    // beforeEnter: checkAuth,
  },
  //Payment Pages and Transactions
  {
    path: '/vt/',
    component: VirtualTerminal,
    // beforeEnter: checkAuth,
  },
  {
    path: '/hpp/',
    component: HostedPmtPage,
  },
  {
    path: '/batches/',
    component: BatchReport,
    // beforeEnter: checkAuth,
  },
  {
    path: '/transactions/',
    component: TransactionReport,
    // beforeEnter: checkAuth,
  },
  {
    path: '/contracts/',
    component: RecurringContracts,
    // beforeEnter: checkAuth,
  },
  {
    path: '/signature/',
    component: SignaturePad,
  },
  //Databoxx Cards
  {
    path: '/gift-cards/',
    component: giftCards,
  },
  {
    path: '/databoxx-cards/',
    component: databoxxCards,
  },

  //Test Pages
  {
    path: '/drag-n-drop/',
    component: DragDrop,
  },

  {
    path: '(.*)',
    component: NotFoundPage,
  },
];

export default routes;
