from django.contrib import admin
from django.urls import path
from django.conf.urls import url, include
from rest_framework import routers
from django.conf.urls.static import static
import project.settings.base as settings

from blog.views import BlogViewset
from datacom.views import DatacomViewset
from users.views import (UserProfileViewset, 
                        UserLoginAPIView, 
                        UserLogOutAPIView, 
                        UserBarcodeViewSet, 
                        AlternativeLoginAPIView, 
                        ChangePasswordAPI,
                        ManagerBarcodeApprovalAPIView, )
from companies.views import CompanyViewset
from customers.views import CustomerViewset
from employees.views import EmployeeViewset, PositionsViewset
from financial.views import SalesTaxViewset
from inventory.views import (InventoryViewset, 
                            InvBarcodesViewset, 
                            InvGalleryViewset, 
                            InvCategoryClassViewset, 
                            InvCategoryViewset,
                            InvLabelViewSet, )
from commons2.views import (CountryViewset, 
                            RegionViewset, 
                            CityViewset, 
                            PostalCodeViewset, 
                            TimezonesViewset, 
                            HolidayViewset, 
                            ContentTypeViewSet, 
                            UserGroupViewSet,
                            UserPermissionsViewSet, 
                            BasePermissionsViewSet, 
                            ShippingViewSet, 
                            DepartmentViewset, 
                            GeneralSettingsViewset, )
from commons.views import IndustryViewset
from attendance.views import (ShiftViewset, 
                            BusinessOperatingHoursViewset, 
                            AttendanceSettingsViewset, 
                            TimeCardViewset, 
                            LeaveRequestViewset, 
                            PayCyclesViewset, 
                            PayCycleRecurrenceView, )
from calendars.views import CalendarViewset
from leads.views import LeadViewset
from partners.views import PartnerViewset
from salesoffices.views import SalesOfficeViewset
from warehouses.views import WarehouseViewset
from vendors.views import VendorViewset
from vthpp.views import (CardProcessingAccountViewset, 
                            CreditCardViewset, 
                            ACHAccountViewset, )
from invoices.views import InvoiceViewset


router = routers.DefaultRouter()

router.register(r'django/attendance-settings', AttendanceSettingsViewset)
router.register(r'django/blogs', BlogViewset)
router.register(r'django/bankacct', ACHAccountViewset)
router.register(r'django/cardprocessingacct', CardProcessingAccountViewset)
router.register(r'django/calendars', CalendarViewset)
router.register(r'django/city', CityViewset)
router.register(r'django/contenttype', ContentTypeViewSet)
router.register(r'django/companies', CompanyViewset)
router.register(r'django/countries', CountryViewset)
router.register(r'django/creditcard', CreditCardViewset)
router.register(r'django/customers', CustomerViewset)
router.register(r'django/datacom', DatacomViewset)
router.register(r'django/departments', DepartmentViewset)
router.register(r'django/employees', EmployeeViewset)
router.register(r'django/general-settings', GeneralSettingsViewset)
router.register(r'django/groups', UserGroupViewSet)
router.register(r'django/holidays', HolidayViewset)
router.register(r'django/industries', IndustryViewset)
router.register(r'django/invbarcodes', InvBarcodesViewset)
router.register(r'django/inventory', InventoryViewset)
router.register(r'django/inventorygallery', InvGalleryViewset)
router.register(r'django/invcategoryclass', InvCategoryClassViewset)
router.register(r'django/invcategory', InvCategoryViewset)
router.register(r'django/invoices', InvoiceViewset)
router.register(r'django/inventory-labels', InvLabelViewSet)
router.register(r'django/leave-request', LeaveRequestViewset)
router.register(r'django/leads', LeadViewset)
router.register(r'django/operating-hours', BusinessOperatingHoursViewset)
router.register(r'django/pay-cycles', PayCyclesViewset)
router.register(r'django/partners', PartnerViewset)
router.register(r'django/permission', BasePermissionsViewSet)
router.register(r'django/permissions', UserPermissionsViewSet)
router.register(r'django/positions', PositionsViewset)
router.register(r'django/postal-code', PostalCodeViewset)
router.register(r'django/region', RegionViewset)
router.register(r'django/shipping', ShippingViewSet)
router.register(r'django/sales-offices', SalesOfficeViewset)
router.register(r'django/sales-tax', SalesTaxViewset)
router.register(r'django/shifts', ShiftViewset)
router.register(r'django/timezones', TimezonesViewset)
router.register(r'django/time-cards', TimeCardViewset)
router.register(r'django/users', UserProfileViewset)
router.register(r'django/user-barcodes', UserBarcodeViewSet)
router.register(r'django/vendors', VendorViewset)
router.register(r'django/warehouses', WarehouseViewset)


# router = routers.DefaultRouter()
# #VTHPP
# router.register(r'django/bankacct', ACHAccountViewset)
# router.register(r'django/cardprocessingacct', CardProcessingAccountViewset)
# router.register(r'django/cardtrans', CardTransactionViewset)
# router.register(r'django/cardtransres', CardTransactionResponseViewset)
# router.register(r'django/creditcard', CreditCardViewset)
# #commons
# router.register(r'django/region', RegionViewset)
# router.register(r'django/city', CityViewset)
# router.register(r'django/timezones', TimezonesViewset)
# router.register(r'django/shipping', ShippingViewSet)
# #Users Base
# router.register(r'django/groups', UserGroupViewSet)
# router.register(r'django/contenttype', ContentTypeViewSet)
# router.register(r'django/permission', BasePermissionsViewSet)
# router.register(r'django/permissions', UserPermissionsViewSet)
# router.register(r'django/users', UserProfileViewset)
# router.register(r'django/user-barcodes', UserBarcodeViewSet)
# #Employees
# router.register(r'django/employees', EmployeeViewset)
# router.register(r'django/positions', PositionsViewset)
# #Inventory
# router.register(r'django/invbarcodes', InvBarcodesViewset)
# router.register(r'django/inventory', InventoryViewset)
# router.register(r'django/inventorygallery', InvGalleryViewset)
# router.register(r'django/invcategoryclass', InvCategoryClassViewset)
# router.register(r'django/invcategory', InvCategoryViewset)
# router.register(r'django/inventory-labels', InvLabelViewSet)
# #Companies
# router.register(r'django/companies', CompanyViewset)
# router.register(r'django/departments', DepartmentViewset)
# #Sales offices
# router.register(r'django/sales-offices', SalesOfficeViewset)
# #Warehouses
# router.register(r'django/warehouses', WarehouseViewset)
# #Blog
# router.register(r'django/blogs', BlogViewset)
# #Leads
# router.register(r'django/leads', LeadViewset)
# #Partners
# router.register(r'django/partners', PartnerViewset)
# #Vendor
# router.register(r'django/vendors', VendorViewset)
# #Customers
# router.register(r'django/customers', CustomerViewset)
# #Datacom
# router.register(r'django/datacom', DatacomViewset)
# #Attendance
# router.register(r'django/holidays', HolidayViewset)
# router.register(r'django/shifts', ShiftViewset)
# router.register(r'django/operating-hours', OperatingHoursViewset)
# router.register(r'django/attendance-settings', AttendanceSettingsViewset)
# router.register(r'django/time-cards', TimeCardViewset)
# router.register(r'django/leave-request', LeaveRequestViewset)
# router.register(r'django/pay-cycles', PayCyclesViewset)
# #Calendars
# router.register(r'django/calendars', CalendarViewset)
# #Invoices
# router.register(r'django/Invoices', InvoiceViewset)





urlpatterns = [
    url(r'^admin/', admin.site.urls),

    #Login & Logout
    path('django/login/', UserLoginAPIView.as_view(), name='login'),
	path('django/logout/', UserLogOutAPIView.as_view(), name='logout'),
    

    # Auth and Validation Custom Endpoints
    path('django/alt-login/', AlternativeLoginAPIView.as_view(), name='alt-login'),
    path('django/pw-reset/', ChangePasswordAPI.as_view(), name='pw-reset'),
    path('django/manager-auth/', ManagerBarcodeApprovalAPIView.as_view(), name='mgr-auth'),
    path('django/pay-cycle-recurrence/', PayCycleRecurrenceView.as_view(), name='pay-cycle-recurrence'),
    

    #Registered Router APIView Routes
    path('', include(router.urls)),


    #API Links
    url(r'^api/', include((router.urls, 'app_name'),
                          namespace='instance_name')),
    url(r'^api/accounts/', include('rest_registration.api.urls')),
    url(r'^api/auth/',
        include('rest_framework.urls', namespace='rest_framework')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
