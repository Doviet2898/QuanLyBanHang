import StatsCards from '../components/StatsCards'
import PendingOrders from '../components/PendingOrders'
import FeatureGrid from '../components/FeatureGrid'

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
