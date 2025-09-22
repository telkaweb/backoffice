<template>
  <div>
    <v-app-bar
        color="rgba(255, 0, 0, 0.5)"
        dark
        rounded
        elevation="24"
    >
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      <v-row>
        <!--        <v-col cols="8" class="mt-4">-->
        <!--        </v-col>-->
        <!--        <v-col cols="1" class="mt-2 text-left">-->
        <!--          <v-icon color="#fdf4d5">mdi-message-outline</v-icon>-->
        <!--        </v-col>-->
        <!--        <v-col cols="1" class="mt-2 text-left">-->
        <!--          <v-icon color="#fdf4d5">mdi-format-list-checks</v-icon>-->
        <!--        </v-col>-->
        <!--        <v-col cols="1" class="mt-2 text-left">-->
        <!--          <v-menu offset-y>-->
        <!--            <template v-slot:activator="{ on, attrs }">-->
        <!--              <v-btn fab v-bind="attrs" text style="margin-top: -17px!important"-->
        <!--                     v-on="on">-->
        <!--                <v-badge  color="error">-->
        <!--                  <v-icon size="x-large" class="color-green custom-animation-navbar-middle">mdi-bell-outline</v-icon>-->
        <!--                </v-badge>-->
        <!--              </v-btn>-->
        <!--            </template>-->

        <!--          </v-menu>-->
        <!--        </v-col>-->
        <v-col cols="12" class="mt-2 text-left">
          <v-icon @click="logout()" color="white">mdi-logout</v-icon>
        </v-col>
      </v-row>
    </v-app-bar>
    <v-navigation-drawer
        width="25vw"
        v-model="drawer"
        right
        absolute
        temporary
        color="rgba(255, 0, 0, 0.5)"
    >
      <v-list
          nav
          dense
      >
        <v-list-item-group
            active-class="active-tab"
        >
          <v-list-item class="item-navbar mt-16" two-line to="/">
            <v-list-item-icon>
              <v-icon color="#fdf4d5" large class="mt-7">mdi-account-details-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="item-navbar-text">داشبورد</v-list-item-title>
          </v-list-item>
          <v-list-item class="item-navbar" two-line to="/profile">
            <v-list-item-icon>
              <v-icon color="#fdf4d5" large class="mt-7">mdi-account-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="item-navbar-text">ویرایش پروفایل</v-list-item-title>
          </v-list-item>
          <v-list-item class="item-navbar" two-line to="/detail/index">
            <v-list-item-icon>
              <v-icon color="#fdf4d5" large class="mt-7">mdi-content-copy</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="item-navbar-text">ویرایش محتوای سایت</v-list-item-title>
          </v-list-item>
          <v-list-group
              no-action
              color="white"
          >
            <template v-slot:activator>
              <v-list-item-icon>
                <v-icon color="white" large class="mt-2">mdi-account</v-icon>
              </v-list-item-icon>
              <v-list-item-content
              >
                <v-list-item-title
                    class="item-navbar-text pr-0">
                  کاربران
                </v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item to="/user/index"
            >
              <v-list-item-title class="item-navbar-sub-text">مدیریت کاربران</v-list-item-title>

              <v-list-item-icon>
                <v-icon color="#fdf4d5">mdi-account-group-outline</v-icon>
              </v-list-item-icon>
            </v-list-item>
            <v-list-item to="/user/create"
            >
              <v-list-item-title class="item-navbar-sub-text">ساخت کاربر جدید</v-list-item-title>

              <v-list-item-icon>
                <v-icon color="#fdf4d5">mdi-account-plus</v-icon>
              </v-list-item-icon>
            </v-list-item>

            <v-list-item to="/admin/index"
            >
              <v-list-item-title class="item-navbar-sub-text">مدیریت ادمین ها</v-list-item-title>

              <v-list-item-icon>
                <v-icon color="#fdf4d5">mdi-account-multiple-check</v-icon>
              </v-list-item-icon>
            </v-list-item>
            <v-list-item to="/admin/create"
            >
              <v-list-item-title class="item-navbar-sub-text">ساخت ادمین جدید</v-list-item-title>

              <v-list-item-icon>
                <v-icon color="#fdf4d5">mdi-account-plus-outline</v-icon>
              </v-list-item-icon>
            </v-list-item>
          </v-list-group>
          <v-list-group
              no-action
              color="white"
          >
            <template v-slot:activator>
              <v-list-item-icon>
                <v-icon color="white" large class="mt-2">mdi-key-outline</v-icon>
              </v-list-item-icon>
              <v-list-item-content
              >
                <v-list-item-title
                    class="item-navbar-text pr-0">
                  دسترسی
                </v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item to="/role/index"
            >
              <v-list-item-title class="item-navbar-sub-text">مدیریت نقش ها</v-list-item-title>
              <v-list-item-icon>
                <v-icon color="#fdf4d5">mdi-garage-lock</v-icon>
              </v-list-item-icon>
            </v-list-item>
            <v-list-item to="/role/create"
            >
              <v-list-item-title class="item-navbar-sub-text">ساخت نقش جدید</v-list-item-title>
              <v-list-item-icon>
                <v-icon color="#fdf4d5">mdi-lock-open-plus-outline</v-icon>
              </v-list-item-icon>
            </v-list-item>
          </v-list-group>
          <v-list-group
              no-action
              color="white"
          >
            <template v-slot:activator>
              <v-list-item-icon>
                <v-icon color="white" large class="mt-2">mdi-bank-outline</v-icon>
              </v-list-item-icon>
              <v-list-item-content
              >
                <v-list-item-title
                    class="item-navbar-text pr-0">
                  مدیریت شعب
                </v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item to="/bank/index"
            >
              <v-list-item-title class="item-navbar-sub-text">مدیریت شعبه ها</v-list-item-title>
              <v-list-item-icon>
                <v-icon color="#fdf4d5">mdi-bank-transfer</v-icon>
              </v-list-item-icon>
            </v-list-item>
            <v-list-item to="/bank/create"
            >
              <v-list-item-title class="item-navbar-sub-text">ساخت شعبه جدید</v-list-item-title>
              <v-list-item-icon>
                <v-icon color="#fdf4d5">mdi-bank-plus</v-icon>
              </v-list-item-icon>
            </v-list-item>
          </v-list-group>
          <v-list-group
              no-action
              color="white"
          >
            <template v-slot:activator>
              <v-list-item-icon>
                <v-icon color="#fdf4d5" large class="mt-2">mdi-message</v-icon>
              </v-list-item-icon>
              <v-list-item-content
              >
                <v-list-item-title
                    class="item-navbar-text pr-0">
                  پیام ها
                </v-list-item-title>
              </v-list-item-content>
            </template>

            <v-list-item to="/message/create"
            >
              <v-list-item-title class="item-navbar-sub-text"> ارسال پیام</v-list-item-title>

              <v-list-item-icon>
                <v-icon color="#fdf4d5">mdi-message-plus-outline</v-icon>
              </v-list-item-icon>
            </v-list-item>

            <v-list-item to="/message/index"
            >
              <v-list-item-title class="item-navbar-sub-text"> مشاهده پیام ها</v-list-item-title>

              <v-list-item-icon>
                <v-icon color="#fdf4d5">mdi-forum</v-icon>
              </v-list-item-icon>
            </v-list-item>


          </v-list-group>
          <v-list-group
              no-action
              color="white"
          >
            <template v-slot:activator>
              <v-list-item-icon>
                <v-icon color="white" large class="mt-2">mdi-tag-outline</v-icon>
              </v-list-item-icon>
              <v-list-item-content
              >
                <v-list-item-title
                    class="item-navbar-text pr-0">
                  تگ
                </v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item to="/tag/index"
            >
              <v-list-item-title class="item-navbar-sub-text">مدیریت تگ ها</v-list-item-title>
              <v-list-item-icon>
                <v-icon color="#fdf4d5">mdi-tag-multiple-outline</v-icon>
              </v-list-item-icon>
            </v-list-item>
            <v-list-item to="/tag/create"
            >
              <v-list-item-title class="item-navbar-sub-text">ساخت تگ جدید</v-list-item-title>
              <v-list-item-icon>
                <v-icon color="#fdf4d5">mdi-tag-plus-outline</v-icon>
              </v-list-item-icon>
            </v-list-item>
          </v-list-group>
          <v-list-group
              no-action
              color="white"
          >
            <template v-slot:activator>
              <v-list-item-icon>
                <v-icon color="white" large class="mt-2">mdi-shape-outline</v-icon>
              </v-list-item-icon>
              <v-list-item-content
              >
                <v-list-item-title
                    class="item-navbar-text pr-0">
                  دسته بندی
                </v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item to="/category/index"
            >
              <v-list-item-title class="item-navbar-sub-text">مدیریت دسته بندی ها</v-list-item-title>
              <v-list-item-icon>
                <v-icon color="#fdf4d5">mdi-shape-outline</v-icon>
              </v-list-item-icon>
            </v-list-item>
            <v-list-item to="/category/create"
            >
              <v-list-item-title class="item-navbar-sub-text">ساخت دسته بندی جدید</v-list-item-title>
              <v-list-item-icon>
                <v-icon color="#fdf4d5">mdi-tab-plus</v-icon>
              </v-list-item-icon>
            </v-list-item>
          </v-list-group>
          <v-list-group
              no-action
              color="white"
          >
            <template v-slot:activator>
              <v-list-item-icon>
                <v-icon color="#fdf4d5" large class="mt-2">mdi-star-check-outline</v-icon>
              </v-list-item-icon>
              <v-list-item-content
              >
                <v-list-item-title
                    class="item-navbar-text pr-0">
                  نظر سنجی
                </v-list-item-title>
              </v-list-item-content>
            </template>

            <v-list-item to="/survey/index"
            >
              <v-list-item-title class="item-navbar-sub-text"> مشاهده نظرات</v-list-item-title>

              <v-list-item-icon>
                <v-icon color="#fdf4d5">mdi-card-account-details-star-outline</v-icon>
              </v-list-item-icon>
            </v-list-item>
          </v-list-group>
          <v-list-group
              no-action
              color="white"
          >
            <template v-slot:activator>
              <v-list-item-icon>
                <v-icon color="#fdf4d5" large class="mt-2">mdi-cards-variant</v-icon>
              </v-list-item-icon>
              <v-list-item-content
              >
                <v-list-item-title
                    class="item-navbar-text pr-0">
                  خدمات
                </v-list-item-title>
              </v-list-item-content>
            </template>

            <v-list-item to="/vip-service/index"
            >
              <v-list-item-title class="item-navbar-sub-text"> مشاهده خدمات</v-list-item-title>

              <v-list-item-icon>
                <v-icon color="#fdf4d5">mdi-card-multiple-outline</v-icon>
              </v-list-item-icon>
            </v-list-item>

            <v-list-item to="/vip-service/create"
            >
              <v-list-item-title class="item-navbar-sub-text">ساخت خدمت جدید</v-list-item-title>

              <v-list-item-icon>
                <v-icon color="#fdf4d5">mdi-card-plus-outline</v-icon>
              </v-list-item-icon>
            </v-list-item>
          </v-list-group>
          <v-list-group
              no-action
              color="white"
          >
            <template v-slot:activator>
              <v-list-item-icon>
                <v-icon color="#fdf4d5" large class="mt-2">mdi-cash</v-icon>
              </v-list-item-icon>
              <v-list-item-content
              >
                <v-list-item-title
                    class="item-navbar-text pr-0">
                  مالی
                </v-list-item-title>
              </v-list-item-content>
            </template>

            <v-list-item to="/wallet/index"
            >
              <v-list-item-title class="item-navbar-sub-text"> مدیریت کیف های پول</v-list-item-title>

              <v-list-item-icon>
                <v-icon color="#fdf4d5">mdi-wallet-outline</v-icon>
              </v-list-item-icon>
            </v-list-item>


            <v-list-item to="/voucher/index"
            >
              <v-list-item-title class="item-navbar-sub-text"> مدیریت کارت های هدیه</v-list-item-title>

              <v-list-item-icon>
                <v-icon color="#fdf4d5">mdi-gift-outline</v-icon>
              </v-list-item-icon>
            </v-list-item>

            <v-list-item to="/voucher/create"
            >
              <v-list-item-title class="item-navbar-sub-text"> ساخت کارت های هدیه</v-list-item-title>

              <v-list-item-icon>
                <v-icon color="#fdf4d5">mdi-wallet-giftcard</v-icon>
              </v-list-item-icon>
            </v-list-item>

            <v-list-item to="/order/index"
            >
              <v-list-item-title class="item-navbar-sub-text"> مدیریت خرید ها</v-list-item-title>

              <v-list-item-icon>
                <v-icon color="#fdf4d5">mdi-cash-multiple</v-icon>
              </v-list-item-icon>
            </v-list-item>

            <v-list-item to="/order/analyze"
            >
              <v-list-item-title class="item-navbar-sub-text">آمار های مالی</v-list-item-title>

              <v-list-item-icon>
                <v-icon color="#fdf4d5">mdi-chart-line-variant</v-icon>
              </v-list-item-icon>
            </v-list-item>
          </v-list-group>
          <v-list-group
              no-action
              color="white"
          >
            <template v-slot:activator>
              <v-list-item-icon>
                <v-icon color="#fdf4d5" large class="mt-2">mdi-ticket-outline</v-icon>
              </v-list-item-icon>
              <v-list-item-content
              >
                <v-list-item-title
                    class="item-navbar-text pr-0">
                  تیکت
                </v-list-item-title>
              </v-list-item-content>
            </template>

            <v-list-item to="/ticket/index"
            >
              <v-list-item-title class="item-navbar-sub-text"> مدیریت تیکت ها</v-list-item-title>

              <v-list-item-icon>
                <v-icon color="#fdf4d5">mdi-message-fast-outline</v-icon>
              </v-list-item-icon>
            </v-list-item>
          </v-list-group>
          <v-list-group
              no-action
              color="white"
          >
            <template v-slot:activator>
              <v-list-item-icon>
                <v-icon color="#fdf4d5" large class="mt-2">mdi-city-variant-outline</v-icon>
              </v-list-item-icon>
              <v-list-item-content
              >
                <v-list-item-title
                    class="item-navbar-text pr-0">
                  مدیریت شهر ، استان و فرودگاه
                </v-list-item-title>
              </v-list-item-content>
            </template>

            <v-list-item to="/state/index"
            >
              <v-list-item-title class="item-navbar-sub-text"> مدیریت استان ها</v-list-item-title>

              <v-list-item-icon>
                <v-icon color="#fdf4d5">mdi-city</v-icon>
              </v-list-item-icon>
            </v-list-item>

            <v-list-item to="/city/index"
            >
              <v-list-item-title class="item-navbar-sub-text">مدیریت شهر ها</v-list-item-title>

              <v-list-item-icon>
                <v-icon color="#fdf4d5">mdi-home-city</v-icon>
              </v-list-item-icon>
            </v-list-item>

            <v-list-item to="/city/create"
            >
              <v-list-item-title class="item-navbar-sub-text">ساخت شهر جدید</v-list-item-title>

              <v-list-item-icon>
                <v-icon color="#fdf4d5">mdi-home-group-plus</v-icon>
              </v-list-item-icon>
            </v-list-item>

            <v-list-item to="/airport/index"
            >
              <v-list-item-title class="item-navbar-sub-text"> مدیریت فرودگاه ها</v-list-item-title>

              <v-list-item-icon>
                <v-icon color="#fdf4d5">mdi-airport</v-icon>
              </v-list-item-icon>
            </v-list-item>

            <v-list-item to="/airport/create"
            >
              <v-list-item-title class="item-navbar-sub-text"> ساخت فرودگاه جدید</v-list-item-title>

              <v-list-item-icon>
                <v-icon color="#fdf4d5">mdi-airplane</v-icon>
              </v-list-item-icon>
            </v-list-item>
          </v-list-group>
          <v-list-group
              no-action
              color="white"
          >
            <template v-slot:activator>
              <v-list-item-icon>
                <v-icon color="#fdf4d5" large class="mt-2">mdi-image-multiple-outline</v-icon>
              </v-list-item-icon>
              <v-list-item-content
              >
                <v-list-item-title
                    class="item-navbar-text pr-0">
                  تور
                </v-list-item-title>
              </v-list-item-content>
            </template>

            <v-list-item to="/tour/index"
            >
              <v-list-item-title class="item-navbar-sub-text"> مدیریت تور ها</v-list-item-title>

              <v-list-item-icon>
                <v-icon color="#fdf4d5">mdi-bus-side</v-icon>
              </v-list-item-icon>
            </v-list-item>

            <v-list-item to="/tour/create"
            >
              <v-list-item-title class="item-navbar-sub-text">ساخت تور جدید</v-list-item-title>

              <v-list-item-icon>
                <v-icon color="#fdf4d5">mdi-image-plus-outline</v-icon>
              </v-list-item-icon>
            </v-list-item>
          </v-list-group>
          <v-list-group
              no-action
              color="white"
          >
            <template v-slot:activator>
              <v-list-item-icon>
                <v-icon color="#fdf4d5" large class="mt-2">mdi-train-car</v-icon>
              </v-list-item-icon>
              <v-list-item-content
              >
                <v-list-item-title
                    class="item-navbar-text pr-0">
                  تی تی سرویس
                </v-list-item-title>
              </v-list-item-content>
            </template>

            <v-list-item to="/travel/index"
            >
              <v-list-item-title class="item-navbar-sub-text"> مدیریت سفر های رزرو شده</v-list-item-title>

              <v-list-item-icon>
                <v-icon color="#fdf4d5">mdi-wallet-travel</v-icon>
              </v-list-item-icon>
            </v-list-item>

            <v-list-item to="/hotel/index"
            >
              <v-list-item-title class="item-navbar-sub-text"> مدیریت هتل های رزرو شده</v-list-item-title>

              <v-list-item-icon>
                <v-icon color="#fdf4d5">mdi-bed-outline</v-icon>
              </v-list-item-icon>
            </v-list-item>

            <v-list-item to="/cip/index"
            >
              <v-list-item-title class="item-navbar-sub-text"> مدیریت خدمات CIP رزرو شده</v-list-item-title>

              <v-list-item-icon>
                <v-icon color="#fdf4d5">mdi-language-c</v-icon>
              </v-list-item-icon>
            </v-list-item>

            <v-list-item to="/insurance/index"
            >
              <v-list-item-title class="item-navbar-sub-text"> مدیریت بیمه های رزرو شده</v-list-item-title>

              <v-list-item-icon>
                <v-icon color="#fdf4d5">mdi-shield-account-variant-outline</v-icon>
              </v-list-item-icon>
            </v-list-item>


            <v-list-item to="/atabat/index"
            >
              <v-list-item-title class="item-navbar-sub-text"> مدیریت عتبات رزرو شده</v-list-item-title>

              <v-list-item-icon>
                <v-icon color="#fdf4d5">mdi-mosque-outline</v-icon>
              </v-list-item-icon>
            </v-list-item>


          </v-list-group>
          <v-list-group
              no-action
              color="white"
          >
            <template v-slot:activator>
              <v-list-item-icon>
                <v-icon color="#fdf4d5" large class="mt-2">mdi-wrench-cog</v-icon>
              </v-list-item-icon>
              <v-list-item-content
              >
                <v-list-item-title
                    class="item-navbar-text pr-0">
                  تنظیمات
                </v-list-item-title>
              </v-list-item-content>
            </template>


            <v-list-item to="/question/index"
            >
              <v-list-item-title class="item-navbar-sub-text"> مدیریت راهنما</v-list-item-title>
              <v-list-item-icon>
                <v-icon color="#fdf4d5">mdi-chat-question-outline</v-icon>
              </v-list-item-icon>
            </v-list-item>

            <v-list-item to="/promot/index"
            >
              <v-list-item-title class="item-navbar-sub-text"> مدیریت کارت های معرفی</v-list-item-title>
              <v-list-item-icon>
                <v-icon color="#fdf4d5">mdi-information-outline</v-icon>
              </v-list-item-icon>
            </v-list-item>

            <v-list-item to="/promot/create"
            >
              <v-list-item-title class="item-navbar-sub-text"> ساخت کارت معرفی</v-list-item-title>
              <v-list-item-icon>
                <v-icon color="#fdf4d5">mdi-plus-box-outline</v-icon>
              </v-list-item-icon>
            </v-list-item>

          </v-list-group>
          <!--          <v-list-group-->
          <!--              no-action-->
          <!--              color="white"-->
          <!--          >-->
          <!--            <template v-slot:activator>-->
          <!--              <v-list-item-icon>-->
          <!--                <v-icon color="#fdf4d5" large class="mt-2">mdi-text-long</v-icon>-->
          <!--              </v-list-item-icon>-->
          <!--              <v-list-item-content-->
          <!--              >-->
          <!--                <v-list-item-title-->
          <!--                    class="item-navbar-text pr-0">-->
          <!--                  بلاگ-->
          <!--                </v-list-item-title>-->
          <!--              </v-list-item-content>-->
          <!--            </template>-->

          <!--            <v-list-item to="/blog/index"-->
          <!--            >-->
          <!--              <v-list-item-title class="item-navbar-sub-text"> مدیریت پست ها</v-list-item-title>-->
          <!--              <v-list-item-icon>-->
          <!--                <v-icon color="#fdf4d5">mdi-folder-text-outline</v-icon>-->
          <!--              </v-list-item-icon>-->
          <!--            </v-list-item>-->

          <!--            <v-list-item to="/blog/create"-->
          <!--            >-->
          <!--              <v-list-item-title class="item-navbar-sub-text">ساخت پست جدید</v-list-item-title>-->
          <!--              <v-list-item-icon>-->
          <!--                <v-icon color="#fdf4d5">mdi-text-box-plus-outline</v-icon>-->
          <!--              </v-list-item-icon>-->
          <!--            </v-list-item>-->
          <!--          </v-list-group>-->

          <div class="mt-16 pl-16 text-center">
            <v-icon @click="logout()" color="white" x-large>mdi-logout</v-icon>
          </div>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  name: "NavbarComponent",
  data() {
    return {
      drawer: false,
    }
  },
  methods: {
    goTo() {
    },
    logout() {
      window.axios.post('/admin/auth/logout').then(() => {
        this.$store.state.user = null
        this.$store.state.auth = false
        this.$router.push('/login')
      })
    }
  }
}
</script>

<style scoped>
.item-navbar-text {
  padding: 10px !important;
  color: white !important;
  font-size: 20px !important;
  font-weight: 800 !important;
}

.item-navbar-sub-text {
  color: white !important;
}

.side-bar {
  border-radius: 10px;
  //border-style: solid;
  //border-width: 1px!important;
  //border-color: #FFD700!important;
  box-shadow: 0px 0px 10px 10px rgba(255, 215, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(236, 185, 31, 0.12) !important;
}

.side-bar:hover {
  border-radius: 10px;
  //border-style: solid;
  //border-width: 1px!important;
  //border-color: #FFD700!important;
  box-shadow: 0px 0px 100px 10px rgba(255, 215, 0, 0.6), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(236, 185, 31, 0.12) !important;
}

.menu-text {
  color: #413b3b !important;
  font-size: 18px !important;
}

.menu-icon {
  color: #413b3b !important;
}

.menu-icon:hover {
  color: #FFD700 !important;
}
</style>