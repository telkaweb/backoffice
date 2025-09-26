import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from "@/views/Home/HomeView";
import LoginView from "@/views/Auth/LoginView";

import CategoryIndexView from "@/views/Category/CategoryIndexView";
import CategoryCreateView from "@/views/Category/CategoryCreateView";
import CategoryEditView from "@/views/Category/CategoryEditView";

import CharityIndexView from "@/views/Charity/CharityIndexView";
import CharityCreateView from "@/views/Charity/CharityCreateView";
import CharityEditView from "@/views/Charity/CharityEditView";
import CharityDonationListView from "@/views/Charity/CharityDonationListView";
import CharityDonationDetailsView from "@/views/Charity/CharityDonationDetailsView";

import TagIndexView from "@/views/Tag/TagIndexView";
import TagCreateView from "@/views/Tag/TagCreateView";
import TagEditView from "@/views/Tag/TagEditView";


import QuestionIndexView from "@/views/Question/QuestionIndexView";
import ContactUsIndexView from "@/views/ContactUs/ContactUsIndexView";
import SettingIndexView from "@/views/Setting/SettingIndexView";
import QuestionEditView from "@/views/Question/QuestionEditView";

import UserIndexView from "@/views/User/UserIndexView.vue";
import UserCreateView from "@/views/User/UserCreateView.vue";
import UserEditView from "@/views/User/UserEditView.vue";
import UserGetView from "@/views/User/UserGetView.vue";
import AdminIndexView from "@/views/Admin/AdminIndexView.vue";
import AdminCreateView from "@/views/Admin/AdminCreateView.vue";
import AdminEditView from "@/views/Admin/AdminEditView.vue";
import AdminGetView from "@/views/Admin/AdminGetView.vue";

import MaterialIndexView from "@/views/Material/MaterialIndexView.vue";
import MaterialCreateView from "@/views/Material/MaterialCreateView.vue";
import MaterialEditView from "@/views/Material/MaterialEditView.vue";
import MaterialGetView from "@/views/Material/MaterialGetView.vue";
import ProductIndexView from "@/views/Product/ProductIndexView.vue";
import ProductCreateView from "@/views/Product/ProductCreateView.vue";
import ProductEditView from "@/views/Product/ProductEditView.vue";
import ProductGetView from "@/views/Product/ProductGetView.vue";
import TransactionIndexView from "@/views/Transaction/TransactionIndexView.vue";
import RoleCreateView from "@/views/Role/RoleCreateView.vue";
import RoleEditView from "@/views/Role/RoleEditView.vue";
import RoleIndexView from "@/views/Role/RoleIndexView.vue";
import RuleIndexView from "@/views/Rule/RuleIndexView.vue";
import RuleGetView from "@/views/Rule/RuleGetView.vue";
import RuleEditView from "@/views/Rule/RuleEditView.vue";
import ContactUsGetView from "@/views/ContactUs/ContactUsGetView.vue";
import StateIndexView from "@/views/State/StateIndexView.vue";
import StateCreateView from "@/views/State/StateCreateView.vue";
import StateEditView from "@/views/State/StateEditView.vue";
import CityIndexView from "@/views/City/CityIndexView.vue";
import CityCreateView from "@/views/City/CityCreateView.vue";
import CityEditView from "@/views/City/CityEditView.vue";
import CommentIndexView from "@/views/Comment/CommentIndexView.vue";
import CommentCreateView from "@/views/Comment/CommentCreateView.vue";
import LikeIndexView from "@/views/Like/LikeIndexView.vue";
import LikeCreateView from "@/views/Like/LikeCreateView.vue";
import TicketIndexView from "@/views/Ticket/TicketIndexView.vue";
import TicketCreateView from "@/views/Ticket/TicketCreateView.vue";
import TicketMyView from "@/views/Ticket/TicketMyView.vue";
import TicketGetView from "@/views/Ticket/TicketGetView.vue";

import QuestionCreateView from "@/views/Question/QuestionCreateView.vue";

import DetailIndexView from "@/views/Detail/DetailIndexView.vue";
import DetailEditView from "@/views/Detail/DetailEditView.vue";
import OrderIndexView from "@/views/Order/OrderIndexView.vue";
import OrderGetView from "@/views/Order/OrderGetView.vue";
import OrderRequestView from "@/views/Order/OrderRequestView.vue";

import BankIndexView from "@/views/Bank/BankIndexView.vue";
import BankCreateView from "@/views/Bank/BankCreateView.vue";
import BankEditView from "@/views/Bank/BankEditView.vue";
import UpdateProfileView from "@/views/Profile/UpdateProfileView.vue";
import AirportIndexView from "@/views/Airport/AirportIndexView.vue";
import AirportCreateView from "@/views/Airport/AirportCreateView.vue";
import AirportEditView from "@/views/Airport/AirportEditView.vue";
import TourIndexView from "@/views/Tour/TourIndexView.vue";
import TourCreateView from "@/views/Tour/TourCreateView.vue";
import TourEditView from "@/views/Tour/TourEditView.vue";
import TourGetView from "@/views/Tour/TourGetView.vue";
import VipServiceIndexView from "@/views/VipService/VipServiceIndexView.vue";
import VipServiceCreateView from "@/views/VipService/VipServiceCreateView.vue";
import VipServiceEditView from "@/views/VipService/VipServiceEditView.vue";
import VipServiceGetView from "@/views/VipService/VipServiceGetView.vue";
import AtabatIndexView from "@/views/Atabat/AtabatIndexView.vue";
import PromotIndexView from "@/views/Promot/PromotIndexView.vue";
import PromotCreateView from "@/views/Promot/PromotCreateView.vue";
import PromotEditView from "@/views/Promot/PromotEditView.vue";
import VoucherIndexView from "@/views/Voucher/VoucherIndexView.vue";
import VoucherCreateView from "@/views/Voucher/VoucherCreateView.vue";
import VoucherEditView from "@/views/Voucher/VoucherEditView.vue";
import SurveyIndexView from "@/views/Survey/SurveyIndexView.vue";
import MessageIndexView from "@/views/Message/MessageIndexView.vue";
import MessageCreateView from "@/views/Message/MessageCreateView.vue";
import WalletIndexView from "@/views/Wallet/WalletIndexView.vue";

Vue.use(VueRouter)

const routes = [
    /*home*/
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    /*login*/
    {
        path: '/login',
        name: 'login',
        component: LoginView
    },

    /*login*/
    {
        path: '/profile',
        name: 'Profile',
        component: UpdateProfileView
    },


    /*Survey*/
    {
        path: '/survey/index',
        name: 'SurveyIndexView',
        component: SurveyIndexView
    },


    /*Wallet*/
    {
        path: '/wallet/index',
        name: 'WalletIndexView',
        component: WalletIndexView
    },



    /*Message*/
    {
        path: '/message/index',
        name: 'MessageIndexView',
        component: MessageIndexView
    },
    {
        path: '/message/create',
        name: 'MessageCreateView',
        component: MessageCreateView
    },



    /*User*/
    {
        path: '/user/index',
        name: 'UserIndexView',
        component: UserIndexView
    },
    {
        path: '/user/create',
        name: 'UserCreateView',
        component: UserCreateView
    },
    {
        path: '/user/edit/:id',
        name: 'UserEditView',
        component: UserEditView
    },
    {
        path: '/user/get/:id',
        name: 'UserGetView',
        component: UserGetView
    },


    /*Promot*/
    {
        path: '/promot/index',
        name: 'PromotIndexView',
        component: PromotIndexView
    },
    {
        path: '/promot/create',
        name: 'PromotCreateView',
        component: PromotCreateView
    },
    {
        path: '/promot/edit/:id',
        name: 'PromotEditView',
        component: PromotEditView
    },

    /*Voucher*/
    {
        path: '/voucher/index',
        name: 'VoucherIndexView',
        component: VoucherIndexView
    },
    {
        path: '/voucher/create',
        name: 'VoucherCreateView',
        component: VoucherCreateView
    },
    {
        path: '/voucher/edit/:id',
        name: 'VoucherEditView',
        component: VoucherEditView
    },



    /*Atabat*/
    {
        path: '/atabat/index',
        name: 'AtabatIndexView',
        component: AtabatIndexView
    },

    /*VipService*/
    {
        path: '/vip-service/index',
        name: 'VipServiceIndexView',
        component: VipServiceIndexView
    },
    {
        path: '/vip-service/create',
        name: 'VipServiceCreateView',
        component: VipServiceCreateView
    },
    {
        path: '/vip-service/edit/:id',
        name: 'VipServiceEditView',
        component: VipServiceEditView
    },
    {
        path: '/vip-service/get/:id',
        name: 'VipServiceGetView',
        component: VipServiceGetView
    },




    /*Tour*/
    {
        path: '/tour/index',
        name: 'TourIndexView',
        component: TourIndexView
    },
    {
        path: '/tour/get/:id',
        name: 'TourGetView',
        component: TourGetView
    },
    {
        path: '/tour/create',
        name: 'TourCreateView',
        component: TourCreateView
    },
    {
        path: '/tour/edit/:id',
        name: 'TourEditView',
        component: TourEditView
    },




    /*Bank*/
    {
        path: '/bank/index',
        name: 'BankIndexView',
        component: BankIndexView
    },
    {
        path: '/bank/create',
        name: 'BankCreateView',
        component: BankCreateView
    },
    {
        path: '/bank/edit/:id',
        name: 'BankEditView',
        component: BankEditView
    },

    /*Admin*/
    {
        path: '/admin/index',
        name: 'AdminIndexView',
        component: AdminIndexView
    },
    {
        path: '/admin/create',
        name: 'AdminCreateView',
        component: AdminCreateView
    },
    {
        path: '/admin/edit/:id',
        name: 'AdminEditView',
        component: AdminEditView
    },
    {
        path: '/admin/get/:id',
        name: 'AdminGetView',
        component: AdminGetView
    },

    /*GoldSmith*/
    {
        path: '/user/index',
        name: 'UserIndexView',
        component: UserIndexView
    },
    {
        path: '/user/create',
        name: 'UserCreateView',
        component: UserCreateView
    },
    {
        path: '/user/edit/:id',
        name: 'UserEditView',
        component: UserEditView
    },


    /*Airport*/
    {
        path: '/airport/index',
        name: 'AirportIndexView',
        component: AirportIndexView
    },
    {
        path: '/airport/create',
        name: 'AirportCreateView',
        component: AirportCreateView
    },
    {
        path: '/airport/edit/:id',
        name: 'AirportEditView',
        component: AirportEditView
    },

    /*Material*/
    {
        path: '/material/index',
        name: 'MaterialIndexView',
        component: MaterialIndexView
    },
    {
        path: '/material/create',
        name: 'MaterialCreateView',
        component: MaterialCreateView
    },
    {
        path: '/material/edit/:id',
        name: 'MaterialEditView',
        component: MaterialEditView
    },
    {
        path: '/material/get/:id',
        name: 'MaterialGetView',
        component: MaterialGetView
    },

    /*Product*/
    {
        path: '/product/index',
        name: 'ProductIndexView',
        component: ProductIndexView
    },
    {
        path: '/product/create',
        name: 'ProductCreateView',
        component: ProductCreateView
    },
    {
        path: '/product/edit/:id',
        name: 'ProductEditView',
        component: ProductEditView
    },
    {
        path: '/product/get/:id',
        name: 'ProductGetView',
        component: ProductGetView
    },


    /*category*/
    {
        path: '/category/index',
        name: 'CategoryIndexView',
        component: CategoryIndexView
    },
    {
        path: '/category/create',
        name: 'CategoryCreateView',
        component: CategoryCreateView
    },
    {
        path: '/category/edit/:id',
        name: 'CategoryEditView',
        component: CategoryEditView
    },

    /*charity*/
    {
        path: '/charity/index',
        name: 'CharityIndexView',
        component: CharityIndexView
    },
    {
        path: '/charity/create',
        name: 'CharityCreateView',
        component: CharityCreateView
    },
    {
        path: '/charity/edit/:id',
        name: 'CharityEditView',
        component: CharityEditView
    },
    {
        path: '/charity/:id/donations',
        name: 'CharityDonationListView',
        component: CharityDonationListView
    },
    {
        path: '/charity/donations/:id/details',
        name: 'CharityDonationDetailsView',
        component: CharityDonationDetailsView
    },
    /*order*/
    {
        path: '/order/index',
        name: 'OrderIndexView',
        component: OrderIndexView
    },
    {
        path: '/order/requests',
        name: 'OrderRequestIndex',
        component: OrderRequestView
    },
    {
        path: '/order/get/:id',
        name: 'OrderGetView',
        component: OrderGetView
    },
    {
        path: '/category/edit/:id',
        name: 'CategoryEditView',
        component: CategoryEditView
    },

    /*tag*/
    {
        path: '/tag/index',
        name: 'TagIndexView',
        component: TagIndexView
    },
    {
        path: '/tag/create',
        name: 'TagCreateView',
        component: TagCreateView
    },
    {
        path: '/tag/edit/:id',
        name: 'TagEditView',
        component: TagEditView
    },

    /*role*/
    {
        path: '/role/index',
        name: 'RoleIndexView',
        component: RoleIndexView
    },
    {
        path: '/role/create',
        name: 'RoleCreateView',
        component: RoleCreateView
    },
    {
        path: '/role/edit/:id',
        name: 'RoleEditView',
        component: RoleEditView
    },


    /*rule*/
    {
        path: '/rule/index',
        name: 'RoleIndexView',
        component: RuleIndexView
    },
    {
        path: '/rule/get/:id',
        name: 'RuleGetView',
        component: RuleGetView
    },
    {
        path: '/rule/edit/:id',
        name: 'RuleEditView',
        component: RuleEditView
    },

    /*question*/
    {
        path: '/question/index',
        name: 'QuestionIndexView',
        component: QuestionIndexView
    },
    {
        path: '/question/create',
        name: 'QuestionCreateView',
        component: QuestionCreateView
    },
    {
        path: '/question/edit/:id',
        name: 'QuestionEditView',
        component: QuestionEditView
    },
    /*transaction*/
    {
        path: '/transaction/index',
        name: 'TransactionIndexView',
        component: TransactionIndexView
    },
    /*contactUs*/
    {
        path: '/contact-us/index',
        name: 'ContactUsIndexView',
        component: ContactUsIndexView
    },
    {
        path: '/contact-us/get/:id',
        name: 'ContactUsGetView',
        component: ContactUsGetView
    },
    /*setting*/
    {
        path: '/setting/index',
        name: 'SettingIndexView',
        component: SettingIndexView
    },
    /*state*/
    {
        path: '/state/index',
        name: 'StateIndexView',
        component: StateIndexView
    },
    {
        path: '/state/create',
        name: 'StateCreateView',
        component: StateCreateView
    },
    {
        path: '/state/edit/:id',
        name: 'StateEditView',
        component: StateEditView
    },
    /*city*/
    {
        path: '/city/index',
        name: 'CityIndexView',
        component: CityIndexView
    },
    {
        path: '/city/create',
        name: 'CityCreateView',
        component: CityCreateView
    },
    {
        path: '/city/edit/:id',
        name: 'CityEditView',
        component: CityEditView
    },

    /*Comment*/
    {
        path: '/comment/index',
        name: 'CommentIndexView',
        component: CommentIndexView
    },
    {
        path: '/comment/create',
        name: 'CommentCreateView',
        component: CommentCreateView
    },

    /*Like*/
    {
        path: '/like/index',
        name: 'LikeIndexView',
        component: LikeIndexView
    },
    {
        path: '/like/create',
        name: 'LikeCreateView',
        component: LikeCreateView
    },

    /*Ticket*/
    {
        path: '/ticket/index',
        name: 'TicketIndexView',
        component: TicketIndexView
    },
    {
        path: '/ticket/my',
        name: 'TicketMyView',
        component: TicketMyView
    },
    {
        path: '/ticket/get/:id',
        name: 'TicketGetView',
        component: TicketGetView
    },
    {
        path: '/ticket/create',
        name: 'TicketCreateView',
        component: TicketCreateView
    },

    /*Detail*/
    {
        path: '/detail/index',
        name: 'DetailIndexView',
        component: DetailIndexView
    },
    {
        path: '/detail/edit/:id',
        name: 'DetailEditView',
        component: DetailEditView
    },

]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
