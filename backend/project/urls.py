from django.contrib import admin
from django.urls import path
from django.conf.urls import url, include
from rest_framework import routers
from django.conf.urls.static import static
import project.settings.base as settings

from datacom.views import (DatacomViewset, 
                        DatacomListViewset,
                        DatacomPrimaryContactViewset, 
                        DatacomShippingContactViewset, 
                        DatacomBillingContactViewset, 
                        DatacomTechnicalContactViewset, )
from partners.views import (PartnerViewset, 
                            PartnerListViewset, 
                            PartnerPrimaryContactViewset, 
                            PartnerShippingContactViewset, 
                            PartnerBillingContactViewset, 
                            PartnerTechnicalContactViewset, )
from companies.views import (CompanyViewset, 
                            CompanyListViewset, 
                            CompanyPrimaryContactViewset, 
                            CompanyShippingContactViewset, 
                            CompanyBillingContactViewset, 
                            CompanyTechnicalContactViewset, )
from vendors.views import (VendorViewset, 
                            VendorListViewset, 
                            VendorPrimaryContactViewset, 
                            VendorShippingContactViewset, 
                            VendorBillingContactViewset, 
                            VendorTechnicalContactViewset, )
                            
from salesoffices.views import (SalesOfficeViewset, 
                                SalesOfficeListViewset, 
                                SalesOfficePrimaryContactViewset, 
                                SalesOfficeShippingContactViewset, 
                                SalesOfficeBillingContactViewset, 
                                SalesOfficeTechnicalContactViewset, 
                                SalesOfficeEmployeesViewset, )
from warehouses.views import (WarehouseViewset, 
                            WarehouseListViewset, 
                            WarehousePrimaryContactViewset, 
                            WarehouseShippingContactViewset, 
                            WarehouseBillingContactViewset, 
                            WarehouseTechnicalContactViewset, 
                            WarehouseEmployeesViewset, 
                            WarehouseSalesOfficesViewset, )

from customers.views import CustomerViewset, CustomerListViewset
from employees.views import (EmployeeViewset, 
                            PositionsViewset, 
                            EmployeeListViewset, 
                            EmployeeModulesManagerViewset, )

from users.views import (UserProfileViewset, 
                        UserListViewset, 
                        UserLoginAPIView, 
                        UserLogOutAPIView, 
                        UserBarcodeViewSet, 
                        AlternativeLoginAPIView, 
                        ChangePasswordAPI,
                        ManagerBarcodeApprovalAPIView, 
                        ContentTypeViewSet, 
                        BaseGroupViewSet,
                        ExtendedGroupViewSet,
                        BasePermissionsViewSet, 
                        ExtendedPermissionsViewSet, 
                        UserGroupsViewSet, )

from blog.views import BlogViewset
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
                            ShippingViewSet, 
                            DepartmentViewset, 
                            GeneralSettingsViewset, )
from commons.views import IndustryViewset, CommonBarcodeViewset, UOMWeightViewset, UOMDimensionViewset
from attendance.views import (ShiftViewset, 
                            BusinessOperatingHoursViewset, 
                            AttendanceSettingsViewset, 
                            TimeCardViewset, 
                            LeaveRequestViewset, 
                            PayCyclesViewset, 
                            PayCycleRecurrenceView, )
from calendars.views import CalendarViewset
from leads.views import LeadViewset
from vthpp.views import (CardProcessingAccountViewset, 
                            CreditCardViewset, 
                            ACHAccountViewset, )
from invoices.views import InvoiceViewset, ReceiptViewset
from notifications.views import NotificationViewset
from humanresources.views import (BenefitsSerializerViewset,
                                EmployeeDocumentsViewset, 
                                CompanyDocumentsViewset, 
                                MileageReimbursementViewset, )
from retailpos.views import OpenAndCloseTillViewset

router = routers.DefaultRouter()

router.register(r'django/attendance-settings', AttendanceSettingsViewset)
router.register(r'django/bankacct', ACHAccountViewset)
router.register(r'django/barcodes', CommonBarcodeViewset)
router.register(r'django/benefits', BenefitsSerializerViewset)
router.register(r'django/blogs', BlogViewset)
router.register(r'django/cardprocessingacct', CardProcessingAccountViewset)
router.register(r'django/calendars', CalendarViewset)
router.register(r'django/city', CityViewset)
router.register(r'django/contenttype', ContentTypeViewSet)

router.register(r'django/company', CompanyViewset, basename="companies")
router.register(r'django/company-list', CompanyListViewset, basename="company-list")
router.register(r'django/company-primary-contacts', CompanyPrimaryContactViewset, basename="company-primary-contacts")
router.register(r'django/company-shipping-contacts', CompanyShippingContactViewset, basename="company-shipping-contacts")
router.register(r'django/company-billing-contacts', CompanyBillingContactViewset, basename="company-billing-contacts")
router.register(r'django/company-technical-contacts', CompanyTechnicalContactViewset, basename="company-technical-contacts")

router.register(r'django/company-docs', CompanyDocumentsViewset)
router.register(r'django/countries', CountryViewset)
router.register(r'django/creditcard', CreditCardViewset)
router.register(r'django/customer', CustomerViewset, basename="customer")
router.register(r'django/customer-list', CustomerListViewset, basename="customers-list")

router.register(r'django/datacom', DatacomViewset, basename="datacom")
router.register(r'django/datacom-list', DatacomListViewset, basename="datacom-list")
router.register(r'django/datacom-primary-contacts', DatacomPrimaryContactViewset, basename="datacom-primary-contacts")
router.register(r'django/datacom-shipping-contacts', DatacomShippingContactViewset, basename="datacom-shipping-contacts")
router.register(r'django/datacom-billing-contacts', DatacomBillingContactViewset, basename="datacom-billing-contacts")
router.register(r'django/datacom-technical-contacts', DatacomTechnicalContactViewset, basename="datacom-technical-contacts")

router.register(r'django/departments', DepartmentViewset)

router.register(r'django/employee', EmployeeViewset, basename="employee")
router.register(r'django/employee-list', EmployeeListViewset, basename="employee-list")
router.register(r'django/employee-modules', EmployeeModulesManagerViewset, basename="employee-modules")
router.register(r'django/employee-docs', EmployeeDocumentsViewset)

router.register(r'django/general-settings', GeneralSettingsViewset)

router.register(r'django/base-groups', BaseGroupViewSet, basename="base-groups")
router.register(r'django/groups-extended', ExtendedGroupViewSet, basename="groups-extended")
router.register(r'django/groups-users', UserGroupsViewSet, basename="groups-users")

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
router.register(r'django/mileage', MileageReimbursementViewset)
router.register(r'django/notifications', NotificationViewset)
router.register(r'django/operating-hours', BusinessOperatingHoursViewset)
router.register(r'django/pay-cycles', PayCyclesViewset)

router.register(r'django/partner', PartnerViewset, basename="partner")
router.register(r'django/partner-list', PartnerListViewset, basename="partner-list")
router.register(r'django/partner-primary-contacts', PartnerPrimaryContactViewset, basename="partner-primary-contacts")
router.register(r'django/partner-shipping-contacts', PartnerShippingContactViewset, basename="partner-shipping-contacts")
router.register(r'django/partner-billing-contacts', PartnerBillingContactViewset, basename="partner-billing-contacts")
router.register(r'django/partner-technical-contacts', PartnerTechnicalContactViewset, basename="partner-technical-contacts")

router.register(r'django/permission', BasePermissionsViewSet)
router.register(r'django/permissions', ExtendedPermissionsViewSet)

router.register(r'django/positions', PositionsViewset)
router.register(r'django/postal-code', PostalCodeViewset)
router.register(r'django/receipts', ReceiptViewset)
router.register(r'django/region', RegionViewset)
router.register(r'django/shipping', ShippingViewSet)

router.register(r'django/sales-office', SalesOfficeViewset, basename="salesoffice")
router.register(r'django/salesoffice-list', SalesOfficeListViewset, basename="salesoffice-list")
router.register(r'django/salesoffice-primary-contacts', SalesOfficePrimaryContactViewset, basename="salesoffice-primary-contacts")
router.register(r'django/salesoffice-shipping-contacts', SalesOfficeShippingContactViewset, basename="salesoffice-shipping-contacts")
router.register(r'django/salesoffice-billing-contacts', SalesOfficeBillingContactViewset, basename="salesoffice-billing-contacts")
router.register(r'django/salesoffice-technical-contacts', SalesOfficeTechnicalContactViewset, basename="salesoffice-technical-contacts")

router.register(r'django/sales-tax', SalesTaxViewset)
router.register(r'django/shifts', ShiftViewset)
router.register(r'django/open-till', OpenAndCloseTillViewset)
router.register(r'django/timezones', TimezonesViewset)
router.register(r'django/time-cards', TimeCardViewset)
router.register(r'django/uom-weight', UOMWeightViewset)
router.register(r'django/uom-dimension', UOMDimensionViewset)

router.register(r'django/users-profile', UserProfileViewset, basename="users-profile")
router.register(r'django/users-list', UserListViewset, basename="users-list")

router.register(r'django/user-barcodes', UserBarcodeViewSet)

router.register(r'django/vendor', VendorViewset, basename="vendor")
router.register(r'django/vendor-list', VendorListViewset, basename="vendor-list")
router.register(r'django/vendor-primary-contacts', VendorPrimaryContactViewset, basename="vendor-primary-contacts")
router.register(r'django/vendor-shipping-contacts', VendorShippingContactViewset, basename="vendor-shipping-contacts")
router.register(r'django/vendor-billing-contacts', VendorBillingContactViewset, basename="vendor-billing-contacts")
router.register(r'django/vendor-technical-contacts', VendorTechnicalContactViewset, basename="vendor-technical-contacts")

router.register(r'django/warehouse', WarehouseViewset, basename="warehouse")
router.register(r'django/warehouse-list', WarehouseListViewset, basename="warehouse-list")
router.register(r'django/warehouse-primary-contacts', WarehousePrimaryContactViewset, basename="warehouse-primary-contacts")
router.register(r'django/warehouse-shipping-contacts', WarehouseShippingContactViewset, basename="warehouse-shipping-contacts")
router.register(r'django/warehouse-billing-contacts', WarehouseBillingContactViewset, basename="warehouse-billing-contacts")
router.register(r'django/warehouse-technical-contacts', WarehouseTechnicalContactViewset, basename="warehouse-technical-contacts")
router.register(r'django/warehouse-employees', WarehouseEmployeesViewset, basename="warehouse-employees")
router.register(r'django/wwarehouse-sales-offices', WarehouseSalesOfficesViewset, basename="warehouse-sales-offices")


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
