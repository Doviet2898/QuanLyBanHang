import { useState } from 'react'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import CreateOrder from './pages/CreateOrder'
import Orders from './pages/Orders'
import Products from './pages/Products'
import Warehouse from './pages/Warehouse'
import Staff from './pages/Staff'
import Reports from './pages/Reports'
import './App.css'

function App() {
    const [currentView, setCurrentView] = useState('dashboard')
    const [orders, setOrders] = useState([])
    const [products, setProducts] = useState([
        { id: 1, name: 'Cà phê đen', price: 25000, stock: 100, category: 'Đồ uống' },
        { id: 2, name: 'Cà phê sữa', price: 30000, stock: 100, category: 'Đồ uống' },
        { id: 3, name: 'Bánh mì', price: 20000, stock: 50, category: 'Đồ ăn' },
        { id: 4, name: 'Trà đào', price: 35000, stock: 80, category: 'Đồ uống' },
    ])
    const [staff, setStaff] = useState([
        { id: 1, name: 'Nguyễn Văn A', position: 'Quản lý', phone: '0901234567', salary: 15000000 },
        { id: 2, name: 'Trần Thị B', position: 'Nhân viên', phone: '0907654321', salary: 8000000 },
    ])

    const addOrder = (order) => {
        const newOrder = {
            ...order,
            id: Date.now(),
            date: new Date().toLocaleString('vi-VN'),
            status: 'Đang xử lý'
        }
        setOrders([newOrder, ...orders])

        // Reduce stock for each item in the order
        const updatedProducts = products.map(product => {
            const orderItem = order.items.find(item => item.id === product.id)
            if (orderItem) {
                return { ...product, stock: Math.max(0, product.stock - orderItem.quantity) }
            }
            return product
        })
        setProducts(updatedProducts)
    }

    const updateOrderStatus = (orderId, newStatus) => {
        setOrders(orders.map(order =>
            order.id === orderId ? { ...order, status: newStatus } : order
        ))
    }

    const addProduct = (product) => {
        const newProduct = {
            ...product,
            id: Date.now()
        }
        setProducts([...products, newProduct])
    }

    const updateProduct = (productId, updatedData) => {
        setProducts(products.map(product =>
            product.id === productId ? { ...product, ...updatedData } : product
        ))
    }

    const deleteProduct = (productId) => {
        setProducts(products.filter(product => product.id !== productId))
    }

    const addStaff = (staffMember) => {
        const newStaff = {
            ...staffMember,
            id: Date.now()
        }
        setStaff([...staff, newStaff])
    }

    const updateStaff = (staffId, updatedData) => {
        setStaff(staff.map(member =>
            member.id === staffId ? { ...member, ...updatedData } : member
        ))
    }

    const deleteStaff = (staffId) => {
        setStaff(staff.filter(member => member.id !== staffId))
    }

    const renderView = () => {
        switch (currentView) {
            case 'dashboard':
                return <Dashboard onFeatureClick={setCurrentView} orders={orders} products={products} />
            case 'create-order':
                return <CreateOrder products={products} onAddOrder={addOrder} onBack={() => setCurrentView('dashboard')} />
            case 'orders':
                return <Orders orders={orders} onUpdateStatus={updateOrderStatus} onBack={() => setCurrentView('dashboard')} />
            case 'products':
                return <Products
                    products={products}
                    onAddProduct={addProduct}
                    onUpdateProduct={updateProduct}
                    onDeleteProduct={deleteProduct}
                    onBack={() => setCurrentView('dashboard')}
                />
            case 'warehouse':
                return <Warehouse products={products} onUpdateProduct={updateProduct} onBack={() => setCurrentView('dashboard')} />
            case 'staff':
                return <Staff
                    staff={staff}
                    onAddStaff={addStaff}
                    onUpdateStaff={updateStaff}
                    onDeleteStaff={deleteStaff}
                    onBack={() => setCurrentView('dashboard')}
                />
            case 'reports':
                return <Reports orders={orders} products={products} onBack={() => setCurrentView('dashboard')} />
            default:
                return <Dashboard onFeatureClick={setCurrentView} orders={orders} products={products} />
        }
    }

    return (
        <div className="app">
            <Header currentView={currentView} onNavigate={setCurrentView} />
            <main className="main-content">
                {renderView()}
            </main>
        </div>
    )
}

export default App
