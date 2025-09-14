import OffersTab from "./OffersTab";
import OrdersTab from "./OrdersTab";
import { TabState } from "./Tabstate";
import UsersTab from "./UsersTab";

interface CurrentTabProps {
    state: TabState
}

function CurrentTab({ state }: CurrentTabProps) {
    switch(state){
        case TabState.Users:
            return <UsersTab />
        case TabState.Offers:
            return <OffersTab />
        case TabState.Orders:
            return <OrdersTab />
    }
}

export default CurrentTab;