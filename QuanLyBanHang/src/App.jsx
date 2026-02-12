import { useState, useEffect } from 'react'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import CreateOrder from './pages/CreateOrder'
import Orders from './pages/Orders'
import Products from './pages/Products'
import Warehouse from './pages/Warehouse'
import Staff from './pages/Staff'
import Reports from './pages/Reports'
import Debts from './pages/Debts'
import ImportGoods from './pages/ImportGoods'
import Suppliers from './pages/Suppliers'
import Reminders from './pages/Reminders'
import Categories from './pages/Categories'
import Promotions from './pages/Promotions'
import StoreSettings from './pages/StoreSettings'
import Expenses from './pages/Expenses'
import './App.css'

function App() {
    const [currentView, setCurrentView] = useState('dashboard')
    const [storeName, setStoreName] = useState('Cafe Đỗ Việt')

    // States for features
    const [orders, setOrders] = useState([])
    const [products, setProducts] = useState([
        { id: 1, name: 'Cà phê đen', price: 25000, stock: 100, category: 'Đồ uống' },
        { id: 2, name: 'Cà phê sữa', price: 30000, stock: 100, category: 'Đồ uống' },
        { id: 3, name: 'Bánh mì', price: 20000, stock: 50, category: 'Đồ ăn' },
        { id: 4, name: 'Trà đào', price: 35000, stock: 80, category: 'Đồ uống' },
    ])
    const [categories, setCategories] = useState(['Đồ uống', 'Đồ ăn', 'Khác'])
    const [suppliers, setSuppliers] = useState([
        { id: 1, name: 'Công ty Cà Phê Việt', phone: '0912345678', address: 'Bảo Lộc, Lâm Đồng' }
    ])
    const [debts, setDebts] = useState([])
    const [importOrders, setImportOrders] = useState([])
    const [reminders, setReminders] = useState([])
    const [promotions, setPromotions] = useState([])
    const [expenses, setExpenses] = useState([
        { id: 1, date: new Date().toLocaleDateString('vi-VN'), title: 'Tiền điện tháng 1', amount: 1500000, type: 'Chi', category: 'Tiền ích' },
        { id: 2, date: new Date().toLocaleDateString('vi-VN'), title: 'Thu tiền thanh lý chai nhựa', amount: 200000, type: 'Thu', category: 'Khác' },
    ])
    const [staff, setStaff] = useState([
        { id: 1, name: 'Nguyễn Văn A', position: 'Quản lý', phone: '0901234567', salary: 15000000 },
        { id: 2, name: 'Trần Thị B', position: 'Nhân viên', phone: '0907654321', salary: 8000000 },
    ])
    const [stockHistory, setStockHistory] = useState([
        { id: 1, date: new Date().toLocaleString('vi-VN'), productName: 'Cà phê đen', type: 'Nhập kho', quantity: 100, note: 'Tồn kho ban đầu' },
    ])

    // Effect to update doc title when storeName changes
    useEffect(() => {
        document.title = `Quản Lý Bán Hàng - ${storeName}`
    }, [storeName])

    // Helper functions
    const addOrder = (order) => {
        const newOrder = { ...order, id: Date.now(), date: new Date().toLocaleString('vi-VN'), status: 'Đang xử lý' }
        setOrders([newOrder, ...orders])

        // Logic for debts if not paid full (simplified)
        if (order.unpaidAmount > 0) {
            setDebts([{
                id: Date.now(),
                customerName: order.customerName,
                phone: order.customerPhone,
                amount: order.unpaidAmount,
                date: new Date().toLocaleString('vi-VN'),
                orderId: newOrder.id
            }, ...debts])
        }

        const historyLogs = []
        const updatedProducts = products.map(product => {
            const orderItem = order.items.find(item => item.id === product.id)
            if (orderItem) {
                historyLogs.push({
                    id: Date.now() + Math.random(),
                    date: new Date().toLocaleString('vi-VN'),
                    productName: product.name,
                    type: 'Xuất kho (Bán hàng)',
                    quantity: orderItem.quantity,
                    note: `Đơn hàng #${newOrder.id}`
                })
                return { ...product, stock: Math.max(0, product.stock - orderItem.quantity) }
            }
            return product
        })
        setProducts(updatedProducts)
        setStockHistory(prev => [...historyLogs, ...prev])
    }

    const handleImport = (importOrder) => {
        const newImport = { ...importOrder, id: Date.now(), date: new Date().toLocaleString('vi-VN') }
        setImportOrders([newImport, ...importOrders])

        const historyLogs = []
        const updatedProducts = products.map(product => {
            const importItem = importOrder.items.find(item => item.id === product.id)
            if (importItem) {
                historyLogs.push({
                    id: Date.now() + Math.random(),
                    date: new Date().toLocaleString('vi-VN'),
                    productName: product.name,
                    type: 'Nhập kho (Nhập hàng)',
                    quantity: importItem.quantity,
                    note: `Đơn nhập #${newImport.id} từ ${importOrder.supplierName}`
                })
                return { ...product, stock: product.stock + importItem.quantity }
            }
            return product
        })
        setProducts(updatedProducts)
        setStockHistory(prev => [...historyLogs, ...prev])
    }

    const renderView = () => {
        const commonProps = { onBack: () => setCurrentView('dashboard') }

        switch (currentView) {
            case 'dashboard': return <Dashboard onFeatureClick={setCurrentView} orders={orders} products={products} />
            case 'create-order': return <CreateOrder products={products} onAddOrder={addOrder} {...commonProps} />
            case 'orders': return <Orders orders={orders} products={products} onUpdateStatus={(id, s) => setOrders(orders.map(o => o.id === id ? { ...o, status: s } : o))} onDeleteOrder={id => setOrders(orders.filter(o => o.id !== id))} onUpdateOrder={(id, u) => setOrders(orders.map(o => o.id === id ? { ...o, ...u } : o))} {...commonProps} />
            case 'products': return <Products products={products} onAddProduct={p => setProducts([...products, { ...p, id: Date.now() }])} onUpdateProduct={(id, d) => setProducts(products.map(p => p.id === id ? { ...p, ...d } : p))} onDeleteProduct={id => setProducts(products.filter(p => p.id !== id))} {...commonProps} />
            case 'warehouse': return <Warehouse products={products} onUpdateProduct={(id, d) => setProducts(products.map(p => p.id === id ? { ...p, ...d } : p))} stockHistory={stockHistory} {...commonProps} />
            case 'staff': return <Staff staff={staff} onAddStaff={s => setStaff([...staff, { ...s, id: Date.now() }])} onUpdateStaff={(id, d) => setStaff(staff.map(s => s.id === id ? { ...s, ...d } : s))} onDeleteStaff={id => setStaff(staff.filter(s => s.id !== id))} {...commonProps} />
            case 'reports': return <Reports orders={orders} products={products} {...commonProps} />
            case 'notebook': return <Debts debts={debts} onPayDebt={id => setDebts(debts.filter(d => d.id !== id))} {...commonProps} />
            case 'import-orders': return <ImportGoods products={products} suppliers={suppliers} onImport={handleImport} {...commonProps} />
            case 'suppliers': return <Suppliers suppliers={suppliers} setSuppliers={setSuppliers} {...commonProps} />
            case 'calendar': return <Reminders reminders={reminders} setReminders={setReminders} {...commonProps} />
            case 'categories': return <Categories categories={categories} setCategories={setCategories} {...commonProps} />
            case 'promotions': return <Promotions promotions={promotions} setPromotions={setPromotions} {...commonProps} />
            case 'store-settings': return <StoreSettings storeName={storeName} setStoreName={setStoreName} {...commonProps} />
            case 'expenses': return <Expenses expenses={expenses} setExpenses={setExpenses} {...commonProps} />
            default: return <Dashboard onFeatureClick={setCurrentView} orders={orders} products={products} />
        }
    }

    return (
        <div className="app">
            <Header storeName={storeName} currentView={currentView} onNavigate={setCurrentView} />
            <main className="main-content">
                {renderView()}
            </main>
        </div>
    )
}

export default App
