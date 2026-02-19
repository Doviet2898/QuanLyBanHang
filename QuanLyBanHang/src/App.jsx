import { useState } from 'react'
import Header from './components/Header/Header'
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
import { useApp } from './context/AppContext'
import './App.css'

function App() {
    const [currentView, setCurrentView] = useState('dashboard')
    const {
        storeName, setStoreName, themeColor, setThemeColor,
        orders, setOrders, products, setProducts, categories, setCategories,
        suppliers, setSuppliers, debts, setDebts, reminders, setReminders,
        promotions, setPromotions, expenses, setExpenses, staff, setStaff,
        stockHistory, addOrder, handleImport
    } = useApp()

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
            case 'store-settings': return <StoreSettings storeName={storeName} setStoreName={setStoreName} themeColor={themeColor} setThemeColor={setThemeColor} {...commonProps} />
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
