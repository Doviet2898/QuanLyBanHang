function StatsCards({ orders, products }) {
    const completedOrders = orders?.filter(order => order.status === 'Hoàn thành') || []
    const totalRevenue = completedOrders.reduce((sum, order) => sum + order.total, 0)

    // Calculate profit based on actual import costs
    const totalCost = completedOrders.reduce((sum, order) => {
        const orderCost = order.items.reduce((itemSum, item) => {
            // Find the product to get its importPrice, fallback to 70% of sale price if not found
            const product = products.find(p => p.id === item.id);
            const importPrice = product?.importPrice ?? (item.price * 0.7);
            return itemSum + (importPrice * item.quantity);
        }, 0);
        return sum + orderCost;
    }, 0);
    const profit = totalRevenue - totalCost;

    const processingOrders = orders?.filter(order => order.status === 'Đang xử lý') || []

    const stats = [
        {
            id: 'revenue',
            label: 'Doanh thu',
            value: totalRevenue.toLocaleString('vi-VN'),
            icon: '💰',
            type: 'revenue'
        },
        {
            id: 'profit',
            label: 'Lợi nhuận',
            value: Math.round(profit).toLocaleString('vi-VN') + 'đ',
            icon: '💡',
            type: 'profit'
        },
        {
            id: 'orders',
            label: 'Đơn hàng',
            value: orders?.length || 0,
            icon: '📦',
            type: 'debt'
        }
    ]

    return (
        <section className="stats-section">
            <div className="stats-grid">
                {stats.map(stat => (
                    <div key={stat.id} className={`stat-card ${stat.type}`}>
                        <div className="stat-header">
                            <div className="stat-icon">{stat.icon}</div>
                            <span className="stat-label">{stat.label}</span>
                        </div>
                        <div className="stat-value">{stat.value}</div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default StatsCards
