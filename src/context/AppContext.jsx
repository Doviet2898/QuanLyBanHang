import { createContext, useContext, useState, useEffect } from 'react'
import { INITIAL_PRODUCTS, INITIAL_CATEGORIES, INITIAL_SUPPLIERS, INITIAL_EXPENSES, INITIAL_STAFF, INITIAL_STOCK_HISTORY } from '../constants/initialData'
import { adjustColor } from '../utils/colorUtils'

const AppContext = createContext()

export function AppProvider({ children }) {
    const [storeName, setStoreName] = useState(() => localStorage.getItem('storeName') || 'Cafe Đỗ Việt')
    const [themeColor, setThemeColor] = useState(() => localStorage.getItem('themeColor') || '#ff6b35')

    // States with localStorage persistence
    const [orders, setOrders] = useState(() => JSON.parse(localStorage.getItem('orders')) || [])
    const [products, setProducts] = useState(() => JSON.parse(localStorage.getItem('products')) || INITIAL_PRODUCTS)
    const [categories, setCategories] = useState(() => JSON.parse(localStorage.getItem('categories')) || INITIAL_CATEGORIES)
    const [suppliers, setSuppliers] = useState(() => JSON.parse(localStorage.getItem('suppliers')) || INITIAL_SUPPLIERS)
    const [debts, setDebts] = useState(() => JSON.parse(localStorage.getItem('debts')) || [])
    const [importOrders, setImportOrders] = useState(() => JSON.parse(localStorage.getItem('importOrders')) || [])
    const [reminders, setReminders] = useState(() => JSON.parse(localStorage.getItem('reminders')) || [])
    const [promotions, setPromotions] = useState(() => JSON.parse(localStorage.getItem('promotions')) || [])
    const [expenses, setExpenses] = useState(() => JSON.parse(localStorage.getItem('expenses')) || INITIAL_EXPENSES)
    const [staff, setStaff] = useState(() => JSON.parse(localStorage.getItem('staff')) || INITIAL_STAFF)
    const [stockHistory, setStockHistory] = useState(() => JSON.parse(localStorage.getItem('stockHistory')) || INITIAL_STOCK_HISTORY)

    // Persistence effect
    useEffect(() => {
        localStorage.setItem('orders', JSON.stringify(orders))
        localStorage.setItem('products', JSON.stringify(products))
        localStorage.setItem('categories', JSON.stringify(categories))
        localStorage.setItem('suppliers', JSON.stringify(suppliers))
        localStorage.setItem('debts', JSON.stringify(debts))
        localStorage.setItem('importOrders', JSON.stringify(importOrders))
        localStorage.setItem('reminders', JSON.stringify(reminders))
        localStorage.setItem('promotions', JSON.stringify(promotions))
        localStorage.setItem('expenses', JSON.stringify(expenses))
        localStorage.setItem('staff', JSON.stringify(staff))
        localStorage.setItem('stockHistory', JSON.stringify(stockHistory))
        localStorage.setItem('storeName', storeName)
        localStorage.setItem('themeColor', themeColor)
    }, [orders, products, categories, suppliers, debts, importOrders, reminders, promotions, expenses, staff, stockHistory, storeName, themeColor])

    // Theme & Title effect
    useEffect(() => {
        document.title = `Quản Lý Bán Hàng - ${storeName}`
        document.documentElement.style.setProperty('--primary-orange', themeColor)
        const darker = themeColor.startsWith('#') ? adjustColor(themeColor, -20) : themeColor
        document.documentElement.style.setProperty('--primary-orange-dark', darker)
    }, [storeName, themeColor])

    // Business Logic
    const addOrder = (order) => {
        const newOrder = { ...order, id: Date.now(), date: new Date().toLocaleString('vi-VN'), status: 'Đang xử lý' }
        setOrders([newOrder, ...orders])

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

    const value = {
        storeName, setStoreName,
        themeColor, setThemeColor,
        orders, setOrders,
        products, setProducts,
        categories, setCategories,
        suppliers, setSuppliers,
        debts, setDebts,
        importOrders, setImportOrders,
        reminders, setReminders,
        promotions, setPromotions,
        expenses, setExpenses,
        staff, setStaff,
        stockHistory, setStockHistory,
        addOrder,
        handleImport
    }

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
    const context = useContext(AppContext)
    if (!context) throw new Error('useApp must be used within an AppProvider')
    return context
}
