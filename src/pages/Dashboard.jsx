import StatsCards from '../components/StatsCards/StatsCards'
import PendingOrders from '../components/PendingOrders/PendingOrders'
import FeatureGrid from '../components/FeatureGrid/FeatureGrid'

function Dashboard({ onFeatureClick, orders, products }) {
    return (
        <div className="container">
            <StatsCards orders={orders} products={products} />
            <PendingOrders orders={orders} onClick={() => onFeatureClick('orders')} />
            <FeatureGrid onFeatureClick={onFeatureClick} />
        </div>
    )
}

export default Dashboard
