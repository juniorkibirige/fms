import Stats from "./components/Stats";
import Report from "./components/Report";
import SupplierList from "./components/Cruds/Supplier/List";
import SupplierCreate from "./components/Cruds/Supplier/Create";
import Tables from "./views/examples/Tables";
import BeneficiaryList from "./components/Cruds/Beneficiaries/List";
import BeneficiaryCreate from "./components/Cruds/Beneficiaries/Create";
import InputsList from "./components/Cruds/Inputs/List";
import InputsCreate from "./components/Cruds/Inputs/Create";
import DistributionList from "./components/Cruds/Distribution/List";
import DistributionCreate from "./components/Cruds/Distribution/Create";

const routes = [
    {
        path: "/index",
        name: "Dashboard",
        icon: "ni ni-tv-2 text-white",
        miniName: 'Dash',
        component: Stats,
        layout: "/dashboard"
    },
    {
        collapse: true,
        name: "Supplier",
        state: "supplierCollapse",
        icon: "fa fa-eye text-white",
        views: [
            {
                path: "/supplier/list",
                name: "All Suppliers",
                icon: "fa fa-users text-white",
                classes: "pl-4",
                miniName: "+S",
                component: SupplierList,
                layout: "/dashboard"
            },
            {
                path: "/supplier/create",
                name: "Add Supplier",
                icon: "fa fa-user-plus text-white",
                classes: "pl-4",
                miniName: "+S",
                component: SupplierCreate,
                layout: "/dashboard"
            },
        ],
    },
    {
        collapse: true,
        name: "Beneficiaries",
        state: "beneficiariesCollapse",
        icon: "fa fa-users text-white",
        views: [
            {
                path: "/beneficiaries/list",
                name: "All Beneficiaries",
                icon: "fa fa-users text-white",
                classes: "pl-4",
                miniName: "AB",
                component: BeneficiaryList,
                layout: "/dashboard"
            },
            {
                path: "/beneficiaries/create",
                name: "Add Beneficiary",
                icon: "fa fa-user-plus text-white",
                classes: "pl-4",
                miniName: "+B",
                component: BeneficiaryCreate,
                layout: "/dashboard"
            },
        ],
    },
    {
        collapse: true,
        name: "Inputs",
        state: "inputCollapse",
        icon: "fa fa-cubes text-white",
        views: [
            {
                path: "/inputs/list",
                name: "All Inputs",
                icon: "fa fa-cube text-white",
                classes: "pl-4",
                miniName: "AI",
                component: InputsList,
                layout: "/dashboard"
            },
            {
                path: "/inputs/create",
                name: "Add Input",
                icon: "fa fa-plus-circle text-white",
                classes: "pl-4",
                miniName: "+I",
                component: InputsCreate,
                layout: "/dashboard"
            },
        ],
    },
    {
        collapse: true,
        name: "Distribution",
        state: "distributionCollapse",
        icon: "fa fa-cubes text-white",
        views: [
            {
                path: "/distribution/list",
                name: "Distribution Logs",
                icon: "fa fa-cube text-white",
                classes: "pl-4",
                miniName: "DL",
                component: DistributionList,
                layout: "/dashboard"
            },
            {
                path: "/distribution/create",
                name: "Distribute Inputs",
                icon: "fa fa-plus-circle text-white",
                classes: "pl-4",
                miniName: "+D",
                component: DistributionCreate,
                layout: "/dashboard"
            },
        ],
    },
    {
        path: "/report",
        name: "Reports",
        icon: "fas fa-file-contract",
        component: Report,
        layout: '/dashboard'
    },
    {
        collapse: true,
        name: "Settings",
        state: "settingsCollapse",
        icon: "fa fa-cog text-orange",
        hidden: true,
        views: [
            {
                path: "/settings/category",
                name: "Category",
                icon: "ni ni-planet text-white",
                classes: "pl-md-4",
                miniName: "Cat",
                component: Tables,
                layout: "/dashboard"
            },
        ]
    }
];
export default routes;
