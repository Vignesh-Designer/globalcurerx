'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  Package,
  Image as ImageIcon,
  Settings as SettingsIcon,
  ShoppingBag,
  Plus,
  Pencil,
  Trash2,
  Upload,
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  ArrowLeft,
  Smartphone,
  Monitor,
  Phone,
  Layers,
  Search,
  ExternalLink,
  Eye,
  EyeOff,
  RotateCcw,
  BookOpen,
  Calendar
} from 'lucide-react';

const CATEGORIES = [
  "Medicines",
  "Vitamins & Supplements",
  "Cosmetics & Personal Care",
  "Medical Equipment",
  "Surgical Products",
  "Medical Consumables",
  "Wellness Essentials",
  "Orthopedic Supports"
];

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('products'); // 'products', 'banners', 'settings', 'orders'
  
  // Products state
  const [products, setProducts] = useState([]);
  const [productSearch, setProductSearch] = useState('');
  const [productCategoryFilter, setProductCategoryFilter] = useState('All');
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productForm, setProductForm] = useState({
    title: '',
    category: 'Medicines',
    actualPrice: 150,
    offerPrice: 120,
    badge: 'OFF 20%',
    stockQuantity: 50,
    isSoldOut: false,
    image: '',
    description: ''
  });
  const [uploadingProductImg, setUploadingProductImg] = useState(false);

  // Banners state
  const [banners, setBanners] = useState([]);
  const [isBannerModalOpen, setIsBannerModalOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState(null);
  const [bannerForm, setBannerForm] = useState({
    title: '',
    subtitle: '',
    desktopImage: '',
    mobileImage: '',
    ctaText: 'Explore Products',
    ctaLink: '#products',
    active: true
  });
  const [uploadingBannerDesktop, setUploadingBannerDesktop] = useState(false);
  const [uploadingBannerMobile, setUploadingBannerMobile] = useState(false);

  // Settings state
  const [settings, setSettings] = useState({
    storeName: "Global Cure RX Pharmacy LLC",
    phone: "+971 50 515 2391",
    whatsapp: "+971 50 515 2391",
    email: "Info@globalcurerx.com",
    address: "Global Healthcare Pharmacy LLC, Shop No: 02, Al Hudaiba, Dubai, UAE",
    poBox: "PO Box: 101892",
    currency: "AED",
    topAnnouncement: "Welcome to Global Healthcare",
    autoScrollInterval: 4000,
    logoUrl: ""
  });
  const [uploadingLogo, setUploadingLogo] = useState(false);

  // Orders state
  const [orders, setOrders] = useState([]);
  const [selectedOrderIds, setSelectedOrderIds] = useState([]);
  const [deleteOrderModal, setDeleteOrderModal] = useState({
    isOpen: false,
    type: null, // 'single', 'selected', 'all'
    targetId: null,
    count: 0
  });

  // Blogs state
  const [blogs, setBlogs] = useState([]);
  const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [blogForm, setBlogForm] = useState({
    title: '',
    date: '',
    image: '',
    summary: '',
    content: ''
  });
  const [uploadingBlogImg, setUploadingBlogImg] = useState(false);
  const [deleteBlogModal, setDeleteBlogModal] = useState({
    isOpen: false,
    targetId: null,
    title: ''
  });

  const handleToggleSelectOrder = (id) => {
    setSelectedOrderIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleToggleSelectAllOrders = () => {
    if (selectedOrderIds.length === orders.length) {
      setSelectedOrderIds([]);
    } else {
      setSelectedOrderIds(orders.map(o => o.id));
    }
  };

  const handleOpenDeleteSingleOrder = (id) => {
    setDeleteOrderModal({
      isOpen: true,
      type: 'single',
      targetId: id,
      count: 1
    });
  };

  const handleOpenDeleteSelectedOrders = () => {
    if (selectedOrderIds.length === 0) return;
    setDeleteOrderModal({
      isOpen: true,
      type: 'selected',
      targetId: null,
      count: selectedOrderIds.length
    });
  };

  const handleOpenDeleteAllOrders = () => {
    if (orders.length === 0) return;
    setDeleteOrderModal({
      isOpen: true,
      type: 'all',
      targetId: null,
      count: orders.length
    });
  };

  const handleConfirmDeleteOrders = async () => {
    try {
      if (deleteOrderModal.type === 'single') {
        const id = deleteOrderModal.targetId;
        const res = await fetch(`/api/orders/${id}`, { method: 'DELETE' });
        if (res.ok) {
          setOrders(prev => prev.filter(o => o.id !== id));
          setSelectedOrderIds(prev => prev.filter(item => item !== id));
          showToast('Order log permanently deleted!');
        } else {
          showToast('Failed to delete order log', 'error');
        }
      } else if (deleteOrderModal.type === 'selected') {
        const res = await fetch('/api/orders/bulk-delete', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ids: selectedOrderIds })
        });
        if (res.ok) {
          const idSet = new Set(selectedOrderIds);
          setOrders(prev => prev.filter(o => !idSet.has(o.id)));
          setSelectedOrderIds([]);
          showToast(`${deleteOrderModal.count} order logs permanently deleted!`);
        } else {
          showToast('Failed to delete selected order logs', 'error');
        }
      } else if (deleteOrderModal.type === 'all') {
        const res = await fetch('/api/orders/bulk-delete', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ all: true })
        });
        if (res.ok) {
          setOrders([]);
          setSelectedOrderIds([]);
          showToast('All order logs permanently deleted!');
        } else {
          showToast('Failed to delete all order logs', 'error');
        }
      }
    } catch (err) {
      showToast('Error during deletion', 'error');
    } finally {
      setDeleteOrderModal({ isOpen: false, type: null, targetId: null, count: 0 });
    }
  };

  // Toast alert
  const [toast, setToast] = useState(null);

  // Admin authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    // Invalidate session whenever leaving, clicking back/forward, or unmounting
    const invalidateSession = () => {
      setIsAuthenticated(false);
      if (typeof window !== 'undefined') {
        sessionStorage.removeItem('globalcure_admin_auth');
      }
      setPinInput('');
    };

    const handlePopState = () => {
      // Browser back/forward button clicked - immediately lock admin panel
      invalidateSession();
    };

    const handlePageShow = (e) => {
      // If loaded from back/forward cache (bfcache), require login
      if (e.persisted) {
        invalidateSession();
      }
    };

    const handlePageHide = () => {
      invalidateSession();
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('pageshow', handlePageShow);
    window.addEventListener('pagehide', handlePageHide);
    window.addEventListener('beforeunload', handlePageHide);

    return () => {
      invalidateSession();
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('pageshow', handlePageShow);
      window.removeEventListener('pagehide', handlePageHide);
      window.removeEventListener('beforeunload', handlePageHide);
    };
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (pinInput === 'admin$91') {
      setIsAuthenticated(true);
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('globalcure_admin_auth', 'true');
        window.history.pushState({ adminAuth: true }, '');
      }
      setPinError('');
    } else {
      setPinError('Incorrect password. Please try again.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('globalcure_admin_auth');
    }
    setPinInput('');
    setShowPassword(false);
  };

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  // Fetch initial data
  const fetchData = async () => {
    try {
      const [prodRes, banRes, setRes, ordRes, blogRes] = await Promise.all([
        fetch('/api/products').then(r => r.json()),
        fetch('/api/banners').then(r => r.json()),
        fetch('/api/settings').then(r => r.json()),
        fetch('/api/orders').then(r => r.json()),
        fetch('/api/blogs').then(r => r.json())
      ]);
      if (Array.isArray(prodRes)) setProducts(prodRes);
      if (Array.isArray(banRes)) setBanners(banRes);
      if (setRes && setRes.phone) setSettings(setRes);
      if (Array.isArray(ordRes)) setOrders(ordRes);
      if (Array.isArray(blogRes)) setBlogs(blogRes);
    } catch (err) {
      console.error('Failed to load admin data', err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handle Product Image Upload
  const handleProductImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    setUploadingProductImg(true);
    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (data.url) {
        setProductForm(prev => ({ ...prev, image: data.url }));
        showToast('Product image uploaded successfully!');
      } else {
        showToast('Image upload failed', 'error');
      }
    } catch (err) {
      showToast('Error uploading image', 'error');
    } finally {
      setUploadingProductImg(false);
    }
  };

  // Handle Banner Desktop & Mobile Image Uploads
  const handleBannerImageUpload = async (file, type) => {
    if (!file) return;
    const formData = new FormData();
    formData.append('image', file);

    if (type === 'desktop') setUploadingBannerDesktop(true);
    if (type === 'mobile') setUploadingBannerMobile(true);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (data.url) {
        if (type === 'desktop') {
          setBannerForm(prev => ({ ...prev, desktopImage: data.url }));
        } else {
          setBannerForm(prev => ({ ...prev, mobileImage: data.url }));
        }
        showToast(`${type === 'desktop' ? 'Desktop' : 'Mobile'} banner uploaded!`);
      }
    } catch (err) {
      showToast('Upload failed', 'error');
    } finally {
      if (type === 'desktop') setUploadingBannerDesktop(false);
      if (type === 'mobile') setUploadingBannerMobile(false);
    }
  };

  // Handle Logo Upload
  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    setUploadingLogo(true);
    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (data.url) {
        const updatedSettings = { ...settings, logoUrl: data.url };
        setSettings(updatedSettings);
        // Persist to backend
        await fetch('/api/settings', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedSettings)
        });
        showToast('Store logo uploaded & updated successfully!');
      } else {
        showToast('Logo upload failed', 'error');
      }
    } catch (err) {
      showToast('Error uploading logo file', 'error');
    } finally {
      setUploadingLogo(false);
    }
  };

  // Reset Logo to Default KURE Badge
  const handleResetLogo = async () => {
    const updatedSettings = { ...settings, logoUrl: '' };
    setSettings(updatedSettings);
    try {
      await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedSettings)
      });
      showToast('Restored default KURE logo');
    } catch (err) {
      showToast('Error resetting logo', 'error');
    }
  };

  // Save Product (Create or Update)
  const handleSaveProduct = async (e) => {
    e.preventDefault();
    try {
      const method = editingProduct ? 'PUT' : 'POST';
      const endpoint = editingProduct ? `/api/products/${editingProduct.id}` : '/api/products';

      const res = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productForm)
      });

      if (res.ok) {
        showToast(editingProduct ? 'Product updated successfully!' : 'New product created!');
        setIsProductModalOpen(false);
        setEditingProduct(null);
        fetchData();
      } else {
        showToast('Failed to save product', 'error');
      }
    } catch (err) {
      showToast('Server error while saving product', 'error');
    }
  };

  // Delete Product
  const handleDeleteProduct = async (id) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
      if (res.ok) {
        showToast('Product deleted');
        setProducts(prev => prev.filter(p => p.id !== id));
      }
    } catch (err) {
      showToast('Error deleting product', 'error');
    }
  };

  // Toggle Sold Out
  const handleToggleSoldOut = async (product) => {
    const updatedStatus = !product.isSoldOut;
    try {
      const res = await fetch(`/api/products/${product.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isSoldOut: updatedStatus })
      });
      if (res.ok) {
        showToast(`Product set to ${updatedStatus ? 'SOLD OUT' : 'IN STOCK'}`);
        fetchData();
      }
    } catch (err) {
      showToast('Failed to update stock status', 'error');
    }
  };

  // Save Banner
  const handleSaveBanner = async (e) => {
    e.preventDefault();
    try {
      const method = editingBanner ? 'PUT' : 'POST';
      const endpoint = editingBanner ? `/api/banners/${editingBanner.id}` : '/api/banners';

      const res = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bannerForm)
      });

      if (res.ok) {
        showToast(editingBanner ? 'Banner updated!' : 'Banner added!');
        setIsBannerModalOpen(false);
        setEditingBanner(null);
        fetchData();
      }
    } catch (err) {
      showToast('Failed to save banner', 'error');
    }
  };

  // Delete Banner
  const handleDeleteBanner = async (id) => {
    if (!confirm('Delete this banner?')) return;
    try {
      await fetch(`/api/banners/${id}`, { method: 'DELETE' });
      showToast('Banner deleted');
      fetchData();
    } catch (err) {
      showToast('Error deleting banner', 'error');
    }
  };

  // Save Settings
  const handleSaveSettings = async (e) => {
    e.preventDefault();

    // Validate phone number: only digits and special characters allowed, no alphabets
    const phoneClean = (settings.phone || '').trim();
    const whatsappClean = (settings.whatsapp || '').trim();

    if (/[a-zA-Z]/.test(phoneClean)) {
      showToast('Call Us Phone Number cannot contain alphabets. Only numbers and +, -, () are allowed.', 'error');
      return;
    }
    if (phoneClean.replace(/[^0-9]/g, '').length < 7) {
      showToast('Call Us Phone Number must contain at least 7 digits.', 'error');
      return;
    }

    if (/[a-zA-Z]/.test(whatsappClean)) {
      showToast('WhatsApp Number cannot contain alphabets. Only numbers and +, -, () are allowed.', 'error');
      return;
    }
    if (whatsappClean.replace(/[^0-9]/g, '').length < 7) {
      showToast('WhatsApp Number must contain at least 7 digits.', 'error');
      return;
    }

    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      });
      if (res.ok) {
        showToast('Store settings & phone numbers saved successfully!');
      } else {
        const errData = await res.json().catch(() => ({}));
        showToast(errData.error || 'Error saving settings', 'error');
      }
    } catch (err) {
      showToast('Server error', 'error');
    }
  };

  // Handle Blog Image Upload
  const handleBlogImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    setUploadingBlogImg(true);
    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (data.url) {
        setBlogForm(prev => ({ ...prev, image: data.url }));
        showToast('Blog image uploaded successfully!');
      } else {
        showToast('Blog image upload failed', 'error');
      }
    } catch (err) {
      showToast('Error uploading blog image', 'error');
    } finally {
      setUploadingBlogImg(false);
    }
  };

  // Open Blog Modal for Add
  const handleOpenAddBlog = () => {
    setEditingBlog(null);
    const todayStr = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    setBlogForm({
      title: '',
      date: todayStr,
      image: '',
      summary: '',
      content: ''
    });
    setIsBlogModalOpen(true);
  };

  // Open Blog Modal for Edit
  const handleOpenEditBlog = (blog) => {
    setEditingBlog(blog);
    setBlogForm({
      title: blog.title || '',
      date: blog.date || '',
      image: blog.image || '',
      summary: blog.summary || '',
      content: blog.content || ''
    });
    setIsBlogModalOpen(true);
  };

  // Save Blog (Create / Update)
  const handleSaveBlog = async (e) => {
    e.preventDefault();
    if (!blogForm.title.trim()) {
      showToast('Article title is required', 'error');
      return;
    }

    try {
      if (editingBlog) {
        const res = await fetch(`/api/blogs/${editingBlog.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(blogForm)
        });
        if (res.ok) {
          const updated = await res.json();
          setBlogs(prev => prev.map(b => b.id === editingBlog.id ? updated : b));
          setIsBlogModalOpen(false);
          showToast('Blog article updated successfully!');
        } else {
          showToast('Failed to update blog article', 'error');
        }
      } else {
        const res = await fetch('/api/blogs', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(blogForm)
        });
        if (res.ok) {
          const created = await res.json();
          setBlogs(prev => [created, ...prev]);
          setIsBlogModalOpen(false);
          showToast('New blog article published successfully!');
        } else {
          showToast('Failed to publish blog article', 'error');
        }
      }
    } catch (err) {
      showToast('Server error while saving blog', 'error');
    }
  };

  // Open & Confirm Delete Blog
  const handleOpenDeleteBlog = (blog) => {
    setDeleteBlogModal({
      isOpen: true,
      targetId: blog.id,
      title: blog.title
    });
  };

  const handleConfirmDeleteBlog = async () => {
    if (!deleteBlogModal.targetId) return;
    try {
      const res = await fetch(`/api/blogs/${deleteBlogModal.targetId}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        setBlogs(prev => prev.filter(b => b.id !== deleteBlogModal.targetId));
        showToast('Blog article permanently deleted!');
      } else {
        showToast('Failed to delete blog article', 'error');
      }
    } catch (err) {
      showToast('Error deleting blog article', 'error');
    } finally {
      setDeleteBlogModal({ isOpen: false, targetId: null, title: '' });
    }
  };

  const filteredProducts = products.filter(p => {
    const matchesCat = productCategoryFilter === 'All' || p.category === productCategoryFilter;
    const matchesSearch = !productSearch || p.title.toLowerCase().includes(productSearch.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans pb-16">
      
      {/* Toast Alert */}
      {toast && (
        <div className={`fixed top-5 right-5 z-50 px-4 py-3 rounded-xl shadow-xl flex items-center space-x-2 text-white text-xs font-semibold animate-in slide-in-from-top-2 ${
          toast.type === 'error' ? 'bg-red-600' : 'bg-emerald-600'
        }`}>
          {toast.type === 'error' ? <AlertCircle className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
          <span>{toast.message}</span>
        </div>
      )}

      {/* Top Navbar */}
      <header className="bg-[#002b5c] text-white px-6 py-4 flex items-center justify-between shadow-md">
        <div className="flex items-center space-x-3">
          <Link
            href="/"
            className="flex items-center space-x-1.5 text-xs text-slate-300 hover:text-white bg-white/10 px-3 py-1.5 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>View Store</span>
          </Link>
          <span className="text-white/30">|</span>
          <h1 className="text-lg font-bold">Global Cure RX Pharmacy — Admin Panel</h1>
        </div>

        <div className="flex items-center space-x-4 text-xs">
          <div className="bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full font-medium flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>Live System</span>
          </div>
          <button
            onClick={handleLogout}
            className="text-xs font-semibold text-rose-300 hover:text-white bg-rose-500/20 hover:bg-rose-500/30 px-3 py-1 rounded-lg transition-colors"
          >
            Log Out
          </button>
        </div>
      </header>

      {/* Security Gate if not authenticated */}
      {!isAuthenticated ? (
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-xl border border-slate-200/80 max-w-md w-full space-y-6 text-center">
            <div className="w-16 h-16 rounded-2xl bg-[#002b5c] text-white flex items-center justify-center mx-auto shadow-md">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 4V20M4 12H20" stroke="#00b4d8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900">Admin Security Authentication</h2>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                This area is restricted to store management only. Please enter your administrator passcode.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <div className="relative flex items-center">
                  <input
                    type={showPassword ? "text" : "password"}
                    autoFocus
                    placeholder="Enter Password"
                    value={pinInput}
                    onChange={(e) => setPinInput(e.target.value)}
                    className="w-full text-center text-sm font-semibold tracking-wider p-3.5 pr-11 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#004b93] focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/50 transition-colors"
                    title={showPassword ? "Hide password" : "Show password"}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4 text-slate-600" />
                    ) : (
                      <Eye className="w-4 h-4 text-slate-500" />
                    )}
                  </button>
                </div>
                {pinError && (
                  <p className="text-xs text-rose-600 mt-2 font-medium">{pinError}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#004b93] hover:bg-[#003a73] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition-all active:scale-98"
              >
                Unlock Admin Dashboard
              </button>
            </form>

            <div className="pt-2">
              <Link
                href="/"
                className="text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
              >
                ← Return to Public Store
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Main Container */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-6 flex-1">
        
        {/* Navigation Tabs */}
        <div className="flex space-x-2 bg-white p-1.5 rounded-2xl shadow-sm mb-6 border border-slate-200/80 overflow-x-auto">
          <button
            onClick={() => setActiveTab('products')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'products'
                ? 'bg-[#004b93] text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Products ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('banners')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'banners'
                ? 'bg-[#004b93] text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>Hero Banners ({banners.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('blogs')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'blogs'
                ? 'bg-[#004b93] text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <BookOpen className="w-4 h-4 text-sky-500" />
            <span>Blog Articles ({blogs.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'settings'
                ? 'bg-[#004b93] text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Phone className="w-4 h-4 text-emerald-500" />
            <span>Phone Numbers & Store Settings</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'orders'
                ? 'bg-[#004b93] text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>WhatsApp Orders Log ({orders.length})</span>
          </button>
        </div>

        {/* TAB 1: PRODUCTS MANAGEMENT */}
        {activeTab === 'products' && (
          <div className="space-y-4">
            {/* Top Toolbar */}
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex flex-1 items-center space-x-3 w-full">
                {/* Search */}
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                    className="w-full text-xs pl-8 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#004b93] focus:outline-none"
                  />
                  <Search className="w-4 h-4 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                </div>

                {/* Category Filter */}
                <select
                  value={productCategoryFilter}
                  onChange={(e) => setProductCategoryFilter(e.target.value)}
                  className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#004b93]"
                >
                  <option value="All">All Categories</option>
                  {CATEGORIES.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              {/* Add Product Button */}
              <button
                onClick={() => {
                  setEditingProduct(null);
                  setProductForm({
                    title: '',
                    category: 'Medicines',
                    actualPrice: 150,
                    offerPrice: 120,
                    badge: '',
                    stockQuantity: 50,
                    isSoldOut: false,
                    image: '',
                    description: ''
                  });
                  setIsProductModalOpen(true);
                }}
                className="w-full md:w-auto px-5 py-2.5 bg-[#004b93] hover:bg-[#003a73] text-white text-xs font-bold rounded-xl shadow transition-colors flex items-center justify-center space-x-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Product</span>
              </button>
            </div>

            {/* Products Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-bold">
                      <th className="py-3.5 px-4">Product</th>
                      <th className="py-3.5 px-4">Category</th>
                      <th className="py-3.5 px-4">Offer Price</th>
                      <th className="py-3.5 px-4">Actual Price</th>
                      <th className="py-3.5 px-4">Badge</th>
                      <th className="py-3.5 px-4">Status</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredProducts.length === 0 ? (
                      <tr>
                        <td colSpan="7" className="text-center py-10 text-slate-400">
                          No products found matching filters.
                        </td>
                      </tr>
                    ) : (
                      filteredProducts.map((p) => (
                        <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-3 px-4 flex items-center space-x-3">
                            <div className="w-12 h-12 rounded-lg bg-slate-50 border border-slate-200 p-1 flex items-center justify-center flex-shrink-0">
                              <img
                                src={p.image || '/placeholder-product.png'}
                                alt={p.title}
                                className="max-h-full max-w-full object-contain"
                              />
                            </div>
                            <div>
                              <p className="font-bold text-slate-800 line-clamp-1">{p.title}</p>
                              <p className="text-[10px] text-slate-400">Qty: {p.stockQuantity}</p>
                            </div>
                          </td>
                          <td className="py-3 px-4 font-medium text-slate-600">
                            <span className="bg-slate-100 px-2 py-0.5 rounded text-[11px]">
                              {p.category}
                            </span>
                          </td>
                          <td className="py-3 px-4 font-bold text-[#31a56d]" style={{ color: '#31a56d' }}>
                            {p.offerPrice} {settings.currency}
                          </td>
                          <td className="py-3 px-4 text-slate-400 line-through">
                            {p.actualPrice} {settings.currency}
                          </td>
                          <td className="py-3 px-4">
                            {p.badge && (
                              <span className="bg-[#005bb5] text-white px-2 py-0.5 rounded text-[10px] font-bold">
                                {p.badge}
                              </span>
                            )}
                          </td>
                          <td className="py-3 px-4">
                            <button
                              onClick={() => handleToggleSoldOut(p)}
                              className={`px-2.5 py-1 rounded-full text-[10px] font-bold transition-colors ${
                                p.isSoldOut
                                  ? 'bg-rose-100 text-rose-700 hover:bg-rose-200'
                                  : 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                              }`}
                            >
                              {p.isSoldOut ? 'Sold Out (Click to In-Stock)' : 'In Stock (Click to Sold Out)'}
                            </button>
                          </td>
                          <td className="py-3 px-4 text-right space-x-2">
                            <button
                              onClick={() => {
                                setEditingProduct(p);
                                setProductForm({
                                  title: p.title,
                                  category: p.category,
                                  actualPrice: p.actualPrice,
                                  offerPrice: p.offerPrice,
                                  badge: p.badge || '',
                                  stockQuantity: p.stockQuantity || 50,
                                  isSoldOut: Boolean(p.isSoldOut),
                                  image: p.image || '',
                                  description: p.description || ''
                                });
                                setIsProductModalOpen(true);
                              }}
                              className="p-1.5 text-slate-500 hover:text-[#004b93] hover:bg-slate-100 rounded-lg transition-colors"
                              title="Edit Product"
                            >
                              <Pencil className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(p.id)}
                              className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                              title="Delete Product"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: BANNERS MANAGEMENT */}
        {activeTab === 'banners' && (
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-800">Homepage Auto-Scrolling Banners</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Upload separate desktop and mobile banners. Banners auto-scroll every {settings.autoScrollInterval / 1000} seconds.
                </p>
              </div>
              <button
                onClick={() => {
                  setEditingBanner(null);
                  setBannerForm({
                    title: '',
                    subtitle: '',
                    desktopImage: '',
                    mobileImage: '',
                    ctaText: 'Explore Products',
                    ctaLink: '#products',
                    active: true
                  });
                  setIsBannerModalOpen(true);
                }}
                className="px-4 py-2 bg-[#004b93] text-white text-xs font-bold rounded-xl flex items-center space-x-1.5 hover:bg-[#003a73]"
              >
                <Plus className="w-4 h-4" />
                <span>Add Banner</span>
              </button>
            </div>

            {/* Banners Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {banners.map((banner, index) => (
                <div key={banner.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm flex flex-col justify-between">
                  <div>
                    {/* Banner Preview */}
                    <div className="h-40 bg-[#002b5c] p-4 flex flex-col justify-between relative text-white">
                      <span className="text-[10px] font-bold bg-white/20 px-2 py-0.5 rounded w-fit">
                        Banner #{index + 1}
                      </span>
                      <h4 className="text-sm font-bold line-clamp-2">{banner.title}</h4>
                      <p className="text-[11px] text-slate-300 line-clamp-2">{banner.subtitle}</p>
                    </div>

                    <div className="p-4 space-y-3">
                      {/* Desktop Image info */}
                      <div className="flex items-center space-x-2 text-xs text-slate-600">
                        <Monitor className="w-4 h-4 text-blue-500" />
                        <span className="font-semibold">Desktop Banner:</span>
                        <span className="text-slate-400 truncate text-[11px]">{banner.desktopImage || 'Set'}</span>
                      </div>

                      {/* Mobile Image info */}
                      <div className="flex items-center space-x-2 text-xs text-slate-600">
                        <Smartphone className="w-4 h-4 text-emerald-500" />
                        <span className="font-semibold">Mobile Banner:</span>
                        <span className="text-slate-400 truncate text-[11px]">{banner.mobileImage || 'Responsive default'}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border-t border-slate-100 flex items-center justify-between bg-slate-50/50">
                    <button
                      onClick={() => {
                        setEditingBanner(banner);
                        setBannerForm({
                          title: banner.title,
                          subtitle: banner.subtitle,
                          desktopImage: banner.desktopImage,
                          mobileImage: banner.mobileImage,
                          ctaText: banner.ctaText || 'Shop Now',
                          ctaLink: banner.ctaLink || '#products',
                          active: banner.active !== undefined ? banner.active : true
                        });
                        setIsBannerModalOpen(true);
                      }}
                      className="px-3 py-1.5 text-xs font-bold text-[#004b93] hover:bg-blue-50 rounded-lg flex items-center space-x-1"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                      <span>Edit Images & Text</span>
                    </button>

                    <button
                      onClick={() => handleDeleteBanner(banner.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg"
                      title="Delete banner"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: PHONE NUMBERS & STORE SETTINGS */}
        {activeTab === 'settings' && (
          <div className="max-w-3xl mx-auto space-y-6">
            {/* Notice Card for Non-Technical Client */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 flex items-start space-x-3.5 text-emerald-900">
              <CheckCircle2 className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div className="text-xs space-y-1">
                <p className="font-bold text-sm text-emerald-800">
                  Easy Phone & WhatsApp Number Configuration
                </p>
                <p className="text-emerald-700 leading-relaxed">
                  You requested: <i>"ready to host without any work i will change the phone number later you can show how to change that later. i don't have any coding knowledge."</i>
                </p>
                <p className="text-emerald-700 font-medium">
                  👉 Simply edit the phone numbers in the fields below and click <b>Save Store Settings</b>. Your whole store (header, footer, WhatsApp cart checkout, call buttons, and mobile bottom bar) will update immediately without touching any code!
                </p>
              </div>
            </div>

            {/* Settings Form */}
            <form onSubmit={handleSaveSettings} className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200 space-y-6">
              
              <div className="border-b border-slate-100 pb-4">
                <h3 className="text-base font-bold text-slate-900">Contact & Calling Numbers</h3>
                <p className="text-xs text-slate-500">Configure where calls and WhatsApp orders will be directed.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Call Us Phone Number */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 flex items-center space-x-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#004b93]" />
                    <span>Call Us Phone Number</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={settings.phone}
                    onChange={(e) => {
                      const val = e.target.value.replace(/[a-zA-Z]/g, '');
                      setSettings({ ...settings, phone: val });
                    }}
                    className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#004b93] focus:outline-none font-semibold text-slate-800"
                    placeholder="Enter mobile number"
                  />
                  <p className="text-[11px] text-slate-400">Only numbers and +, -, () allowed. Used by "Call Us" buttons and cart.</p>
                </div>

                {/* WhatsApp Phone Number */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 flex items-center space-x-1.5">
                    <span className="text-emerald-500 font-black">WA</span>
                    <span>WhatsApp Order Phone Number</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={settings.whatsapp}
                    onChange={(e) => {
                      const val = e.target.value.replace(/[a-zA-Z]/g, '');
                      setSettings({ ...settings, whatsapp: val });
                    }}
                    className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#004b93] focus:outline-none font-semibold text-slate-800"
                    placeholder="Enter whatsapp number"
                  />
                  <p className="text-[11px] text-slate-400">Only numbers and +, -, () allowed. Receives customer orders on WhatsApp.</p>
                </div>
              </div>

              <div className="border-b border-slate-100 pb-4 pt-2">
                <h3 className="text-base font-bold text-slate-900">Store Identity & Details</h3>
                <p className="text-xs text-slate-500">Store logo, store name, currency, and physical address shown across the site.</p>
              </div>

              {/* Logo Management Section */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <label className="text-xs font-bold text-slate-800 flex items-center space-x-1.5">
                      <ImageIcon className="w-4 h-4 text-[#004b93]" />
                      <span>Store Logo (Shown in Header)</span>
                    </label>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Upload your own custom pharmacy brand logo (PNG, JPG, SVG, WEBP).
                    </p>
                  </div>
                  {settings.logoUrl && (
                    <button
                      type="button"
                      onClick={handleResetLogo}
                      className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-white border border-slate-200 text-slate-600 hover:text-rose-600 hover:border-rose-200 text-xs font-semibold rounded-xl transition-colors shadow-2xs self-start sm:self-auto"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Reset to Default Logo</span>
                    </button>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4 bg-white p-4 rounded-xl border border-slate-200">
                  {/* Current Logo Preview */}
                  <div className="flex flex-col items-center justify-center p-3 border border-dashed border-slate-200 rounded-xl bg-slate-50/50 min-w-[240px] h-24">
                    {settings.logoUrl ? (
                      <img
                        src={settings.logoUrl}
                        alt="Store Logo Preview"
                        className="max-h-[70px] max-w-[220px] object-contain"
                      />
                    ) : (
                      <div className="flex items-center space-x-2 text-slate-400">
                        <div className="w-8 h-8 rounded-full bg-[#e6f4f8] flex items-center justify-center text-[#0284c7]">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                            <path d="M12 4V20M4 12H20" stroke="#0284c7" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        <div className="text-left">
                          <span className="text-base font-black text-[#002b5c] block leading-none">KURE</span>
                          <span className="text-[9px] text-slate-400 uppercase font-semibold">Default Logo</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Upload Action */}
                  <div className="flex-1 space-y-2 text-center sm:text-left">
                    <label className="cursor-pointer inline-flex items-center space-x-2 px-4 py-2.5 bg-[#004b93] hover:bg-[#003a73] text-white text-xs font-bold rounded-xl transition-all shadow-sm active:scale-95">
                      <Upload className="w-4 h-4" />
                      <span>{uploadingLogo ? 'Uploading Logo...' : 'Upload Your Logo'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleLogoUpload}
                        disabled={uploadingLogo}
                      />
                    </label>
                    <p className="text-[11px] text-slate-400">
                      Recommended: Transparent background PNG or SVG, ~220x70 px. Changes take effect across the entire site immediately.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Store Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Store Name</label>
                  <input
                    type="text"
                    required
                    value={settings.storeName}
                    onChange={(e) => setSettings({ ...settings, storeName: e.target.value })}
                    className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#004b93] focus:outline-none font-semibold text-slate-800"
                  />
                </div>

                {/* Currency */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Currency Symbol</label>
                  <input
                    type="text"
                    required
                    value={settings.currency}
                    onChange={(e) => setSettings({ ...settings, currency: e.target.value })}
                    className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#004b93] focus:outline-none font-semibold text-slate-800"
                    placeholder="AED"
                  />
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Store Email</label>
                  <input
                    type="email"
                    required
                    value={settings.email}
                    onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                    className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#004b93] focus:outline-none font-semibold text-slate-800"
                  />
                </div>

                {/* Announcement */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Top Banner Announcement</label>
                  <input
                    type="text"
                    value={settings.topAnnouncement}
                    onChange={(e) => setSettings({ ...settings, topAnnouncement: e.target.value })}
                    className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#004b93] focus:outline-none font-semibold text-slate-800"
                  />
                </div>
              </div>

              {/* Address */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Physical Address</label>
                <input
                  type="text"
                  value={settings.address}
                  onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                  className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#004b93] focus:outline-none font-semibold text-slate-800"
                />
              </div>

              {/* PO Box */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">PO Box</label>
                <input
                  type="text"
                  value={settings.poBox}
                  onChange={(e) => setSettings({ ...settings, poBox: e.target.value })}
                  className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#004b93] focus:outline-none font-semibold text-slate-800"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-4 text-right">
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#004b93] hover:bg-[#003a73] text-white text-xs font-bold rounded-xl shadow-md transition-all active:scale-98"
                >
                  Save Store Settings
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TAB 4: WHATSAPP ORDERS LOG */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-bold text-slate-800">WhatsApp Inquiries & Orders Log</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Customer order requests sent to WhatsApp. You can delete individual or selected logs permanently.
                </p>
              </div>

              {/* Action Toolbar */}
              {orders.length > 0 && (
                <div className="flex items-center space-x-2.5 flex-wrap gap-y-2">
                  {/* Select All Checkbox */}
                  <label className="inline-flex items-center space-x-2 px-3.5 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl cursor-pointer text-xs font-bold text-slate-700 transition-colors">
                    <input
                      type="checkbox"
                      checked={selectedOrderIds.length > 0 && selectedOrderIds.length === orders.length}
                      onChange={handleToggleSelectAllOrders}
                      className="w-4 h-4 text-[#004b93] rounded"
                    />
                    <span>
                      {selectedOrderIds.length === orders.length ? 'Deselect All' : 'Select All'}
                    </span>
                  </label>

                  {/* Delete Selected Button */}
                  {selectedOrderIds.length > 0 && (
                    <button
                      onClick={handleOpenDeleteSelectedOrders}
                      className="inline-flex items-center space-x-1.5 px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl shadow-sm transition-all active:scale-95 animate-in fade-in duration-150"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete Selected ({selectedOrderIds.length})</span>
                    </button>
                  )}

                  {/* Clear All Logs Button */}
                  <button
                    onClick={handleOpenDeleteAllOrders}
                    className="inline-flex items-center space-x-1.5 px-3.5 py-2 border border-rose-200 text-rose-600 hover:bg-rose-50 text-xs font-bold rounded-xl transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Clear All Logs</span>
                  </button>
                </div>
              )}
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              {orders.length === 0 ? (
                <div className="p-12 text-center text-slate-400">
                  <ShoppingBag className="w-10 h-10 mx-auto mb-2 opacity-50" />
                  <p className="font-semibold text-xs">No orders recorded yet.</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">When customers place an order via WhatsApp, it will appear here.</p>
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {orders.map((ord) => {
                    const isSelected = selectedOrderIds.includes(ord.id);
                    return (
                      <div
                        key={ord.id}
                        className={`p-5 transition-colors space-y-3 ${
                          isSelected ? 'bg-blue-50/40 border-l-4 border-l-[#004b93]' : 'hover:bg-slate-50/50'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => handleToggleSelectOrder(ord.id)}
                              className="w-4 h-4 text-[#004b93] rounded cursor-pointer"
                              aria-label={`Select order ${ord.id}`}
                            />
                            <span className="font-mono text-[11px] font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                              {ord.id}
                            </span>
                            <span className="text-xs text-slate-400">
                              {new Date(ord.createdAt).toLocaleString()}
                            </span>
                          </div>
                          <span className="text-sm font-extrabold text-[#31a56d]" style={{ color: '#31a56d' }}>
                            Total: {ord.subtotal} {settings.currency}
                          </span>
                        </div>

                        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs space-y-1">
                          <p className="font-semibold text-slate-600 mb-1">Ordered Products ({ord.totalItems} items):</p>
                          {ord.items && ord.items.map((item, i) => (
                            <div key={i} className="flex justify-between text-slate-700">
                              <span>• {item.title} <b className="text-slate-900">x {item.quantity}</b></span>
                              <span className="font-medium text-[#31a56d]" style={{ color: '#31a56d' }}>{item.price * item.quantity} {settings.currency}</span>
                            </div>
                          ))}
                        </div>

                        <div className="flex items-center justify-between pt-1">
                          <div>
                            {ord.whatsappUrl && (
                              <a
                                href={ord.whatsappUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center space-x-1 text-[11px] font-bold text-emerald-600 hover:text-emerald-700 hover:underline"
                              >
                                <span>Open WhatsApp Message</span>
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            )}
                          </div>

                          {/* Individual Delete Log Button */}
                          <button
                            onClick={() => handleOpenDeleteSingleOrder(ord.id)}
                            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-200 transition-colors"
                            title="Delete this order log permanently"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Delete Log</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB: BLOG ARTICLES MANAGEMENT */}
        {activeTab === 'blogs' && (
          <div className="space-y-6">
            {/* Header / Action Bar */}
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <BookOpen className="w-5 h-5 text-[#004b93]" />
                  <h2 className="text-base font-bold text-slate-800">
                    Blog Articles & Health News ({blogs.length})
                  </h2>
                </div>
                <p className="text-xs text-slate-500 max-w-2xl">
                  Control all articles displayed in the &quot;From Our Blog&quot; section on the storefront homepage. Add featured images, publication dates, card summaries, and full article descriptions.
                </p>
              </div>

              <button
                onClick={handleOpenAddBlog}
                className="inline-flex items-center justify-center space-x-2 px-4 py-2.5 bg-[#004b93] hover:bg-[#003a73] text-white text-xs font-bold rounded-xl shadow transition-all active:scale-95 whitespace-nowrap"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Article</span>
              </button>
            </div>

            {/* Articles Grid */}
            {blogs.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 space-y-3">
                <BookOpen className="w-12 h-12 text-slate-300 mx-auto" />
                <h3 className="text-sm font-bold text-slate-700">No Blog Articles Yet</h3>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  Click the &quot;Add New Article&quot; button above to create and publish your first health article or pharmacy update.
                </p>
                <button
                  onClick={handleOpenAddBlog}
                  className="mt-2 inline-flex items-center space-x-1.5 px-4 py-2 bg-[#004b93] text-white text-xs font-bold rounded-xl hover:bg-[#003a73]"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Create First Article</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogs.map((blog) => (
                  <div
                    key={blog.id}
                    className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
                  >
                    <div>
                      {/* Image Preview with Date Badge */}
                      <div className="relative w-full h-44 bg-slate-100 overflow-hidden">
                        <img
                          src={blog.image || '/blog/ent-specialist.png'}
                          alt={blog.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = '/banners/banner_original.png';
                          }}
                        />
                        <div className="absolute top-2.5 right-2.5 bg-[#002b5c]/85 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-1 rounded-lg flex items-center space-x-1 shadow-sm">
                          <Calendar className="w-3 h-3 text-cyan-300" />
                          <span>{blog.date || 'No Date'}</span>
                        </div>
                      </div>

                      {/* Content Card Body */}
                      <div className="p-4 space-y-2.5">
                        <h3 className="text-sm font-bold text-slate-800 line-clamp-2 leading-snug">
                          {blog.title}
                        </h3>

                        <div className="space-y-1">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Card Summary:</span>
                          <p className="text-xs text-slate-600 line-clamp-3 bg-slate-50 p-2.5 rounded-xl border border-slate-100 leading-relaxed">
                            {blog.summary || <span className="italic text-slate-400">No summary description</span>}
                          </p>
                        </div>

                        {blog.content && (
                          <div className="space-y-1">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Full Content Preview:</span>
                            <p className="text-[11px] text-slate-500 line-clamp-2 italic">
                              {blog.content}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Footer Action Buttons */}
                    <div className="p-4 pt-2 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[10px] font-mono text-slate-400">
                        ID: {blog.id}
                      </span>

                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleOpenEditBlog(blog)}
                          className="inline-flex items-center space-x-1 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg transition-colors"
                          title="Edit article"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => handleOpenDeleteBlog(blog)}
                          className="inline-flex items-center space-x-1 px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-bold rounded-lg transition-colors"
                          title="Delete article"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>

      {/* PRODUCT CREATE / EDIT MODAL */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold text-slate-900">
              {editingProduct ? 'Edit Product' : 'Add New Product'}
            </h3>

            <form onSubmit={handleSaveProduct} className="space-y-4">
              
              {/* Title */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Product Title *</label>
                <input
                  type="text"
                  required
                  value={productForm.title}
                  onChange={(e) => setProductForm({ ...productForm, title: e.target.value })}
                  placeholder="e.g. Digital Thermometer"
                  className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#004b93] focus:outline-none"
                />
              </div>

              {/* Category (The 7 requested categories) */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Category *</label>
                <select
                  value={productForm.category}
                  onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                  className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#004b93] focus:outline-none font-semibold text-slate-800"
                >
                  {CATEGORIES.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              {/* Price Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Offer Price ({settings.currency}) *</label>
                  <input
                    type="number"
                    required
                    min="0"
                    step="0.01"
                    value={productForm.offerPrice}
                    onChange={(e) => setProductForm({ ...productForm, offerPrice: e.target.value })}
                    className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#004b93] focus:outline-none font-bold"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Actual Price ({settings.currency})</label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={productForm.actualPrice}
                    onChange={(e) => setProductForm({ ...productForm, actualPrice: e.target.value })}
                    className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#004b93] focus:outline-none"
                  />
                </div>
              </div>

              {/* Stock and Badge */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Stock Quantity</label>
                  <input
                    type="number"
                    min="0"
                    value={productForm.stockQuantity}
                    onChange={(e) => setProductForm({ ...productForm, stockQuantity: e.target.value })}
                    className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#004b93] focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Discount Badge (Optional)</label>
                  <input
                    type="text"
                    value={productForm.badge}
                    onChange={(e) => setProductForm({ ...productForm, badge: e.target.value })}
                    placeholder="Enter the offer percentage"
                    className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#004b93] focus:outline-none"
                  />
                  <p className="text-[10px] text-slate-400">
                    Displays on product card (e.g. OFF 20%). Leave blank for no badge.
                  </p>
                </div>
              </div>

              {/* Sold Out Toggle */}
              <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
                <input
                  type="checkbox"
                  id="soldout-checkbox"
                  checked={productForm.isSoldOut}
                  onChange={(e) => setProductForm({ ...productForm, isSoldOut: e.target.checked })}
                  className="w-4 h-4 text-[#004b93] rounded"
                />
                <label htmlFor="soldout-checkbox" className="text-xs font-bold text-slate-700 cursor-pointer">
                  Mark as Sold Out (Disables purchase and displays "SOLD OUT" badge)
                </label>
              </div>

              {/* Image Upload */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Product Image</label>
                <div className="flex items-center space-x-4">
                  {productForm.image && (
                    <div className="w-16 h-16 rounded-xl border border-slate-200 p-1 bg-white flex items-center justify-center flex-shrink-0">
                      <img src={productForm.image} alt="Preview" className="max-h-full max-w-full object-contain" />
                    </div>
                  )}
                  <div className="flex-1">
                    <label className="cursor-pointer inline-flex items-center space-x-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors">
                      <Upload className="w-3.5 h-3.5" />
                      <span>{uploadingProductImg ? 'Uploading...' : 'Upload Image File'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleProductImageUpload}
                        disabled={uploadingProductImg}
                      />
                    </label>
                    <p className="text-[10px] text-slate-400 mt-1">PNG, JPG, WEBP up to 10MB</p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Description / About Product</label>
                <textarea
                  rows="3"
                  value={productForm.description}
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                  placeholder="Detailed product information..."
                  className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#004b93] focus:outline-none"
                />
              </div>

              {/* Actions */}
              <div className="flex justify-end space-x-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-5 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 text-xs font-bold bg-[#004b93] text-white rounded-xl hover:bg-[#003a73] shadow"
                >
                  Save Product
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* BANNER CREATE / EDIT MODAL */}
      {isBannerModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold text-slate-900">
              {editingBanner ? 'Edit Banner' : 'Add New Banner'}
            </h3>

            <form onSubmit={handleSaveBanner} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Banner Title *</label>
                <input
                  type="text"
                  required
                  value={bannerForm.title}
                  onChange={(e) => setBannerForm({ ...bannerForm, title: e.target.value })}
                  className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#004b93] focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Subtitle / Tagline</label>
                <textarea
                  rows="2"
                  value={bannerForm.subtitle}
                  onChange={(e) => setBannerForm({ ...bannerForm, subtitle: e.target.value })}
                  className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#004b93] focus:outline-none"
                />
              </div>

              {/* Desktop Banner Image Upload */}
              <div className="space-y-1.5 p-3 bg-slate-50 rounded-xl border border-slate-200">
                <label className="text-xs font-bold text-slate-800 flex items-center space-x-1.5">
                  <Monitor className="w-4 h-4 text-blue-600" />
                  <span>Desktop Banner Image (Wide 16:9)</span>
                </label>
                <div className="flex items-center space-x-3">
                  {bannerForm.desktopImage && (
                    <img src={bannerForm.desktopImage} alt="Desktop Preview" className="h-12 w-20 object-cover rounded-lg border" />
                  )}
                  <label className="cursor-pointer px-4 py-2 bg-white border border-slate-200 text-slate-700 text-xs font-bold rounded-xl hover:bg-slate-50">
                    <Upload className="w-3.5 h-3.5 inline mr-1" />
                    <span>{uploadingBannerDesktop ? 'Uploading...' : 'Upload Desktop Banner'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleBannerImageUpload(e.target.files[0], 'desktop')}
                    />
                  </label>
                </div>
              </div>

              {/* Mobile Banner Image Upload (Specifically requested!) */}
              <div className="space-y-1.5 p-3 bg-emerald-50/50 rounded-xl border border-emerald-200">
                <label className="text-xs font-bold text-slate-800 flex items-center space-x-1.5">
                  <Smartphone className="w-4 h-4 text-emerald-600" />
                  <span>Mobile Responsive Banner Image (Vertical / Mobile)</span>
                </label>
                <p className="text-[10px] text-slate-500">
                  Upload a dedicated mobile banner designed specifically for smartphones and tablets.
                </p>
                <div className="flex items-center space-x-3 pt-1">
                  {bannerForm.mobileImage && (
                    <img src={bannerForm.mobileImage} alt="Mobile Preview" className="h-14 w-10 object-cover rounded-lg border" />
                  )}
                  <label className="cursor-pointer px-4 py-2 bg-white border border-emerald-300 text-emerald-800 text-xs font-bold rounded-xl hover:bg-emerald-50">
                    <Upload className="w-3.5 h-3.5 inline mr-1" />
                    <span>{uploadingBannerMobile ? 'Uploading...' : 'Upload Mobile Banner'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleBannerImageUpload(e.target.files[0], 'mobile')}
                    />
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Button Text</label>
                  <input
                    type="text"
                    value={bannerForm.ctaText}
                    onChange={(e) => setBannerForm({ ...bannerForm, ctaText: e.target.value })}
                    className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Button Link</label>
                  <input
                    type="text"
                    value={bannerForm.ctaLink}
                    onChange={(e) => setBannerForm({ ...bannerForm, ctaLink: e.target.value })}
                    className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsBannerModalOpen(false)}
                  className="px-5 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 text-xs font-bold bg-[#004b93] text-white rounded-xl hover:bg-[#003a73]"
                >
                  Save Banner
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* PERMANENT DELETION CONFIRMATION MODAL */}
      {deleteOrderModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl space-y-5 text-center border border-slate-200">
            {/* Warning Icon Badge */}
            <div className="w-16 h-16 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto shadow-inner">
              <AlertTriangle className="w-8 h-8" />
            </div>

            {/* Title & Warning Message */}
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-slate-900">
                Permanent Deletion Confirmation
              </h3>
              <p className="text-sm font-bold text-rose-600 bg-rose-50 py-2.5 px-3 rounded-xl border border-rose-100">
                ⚠️ It will not recover. Are you sure?
              </p>
              <p className="text-xs text-slate-500 leading-relaxed pt-1">
                {deleteOrderModal.type === 'single' && (
                  <>Order log <span className="font-mono font-bold text-slate-700">{deleteOrderModal.targetId}</span> will be permanently deleted from the database file and cannot be restored.</>
                )}
                {deleteOrderModal.type === 'selected' && (
                  <><span className="font-bold text-slate-800">{deleteOrderModal.count} selected order logs</span> will be permanently deleted from the database file and cannot be restored.</>
                )}
                {deleteOrderModal.type === 'all' && (
                  <><span className="font-bold text-slate-800">All order logs</span> will be permanently erased from the server and cannot be restored.</>
                )}
              </p>
            </div>

            {/* Action Buttons: Yes / No */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeleteOrderModal({ isOpen: false, type: null, targetId: null, count: 0 })}
                className="w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors"
              >
                No, Cancel
              </button>

              <button
                type="button"
                onClick={handleConfirmDeleteOrders}
                className="w-full py-2.5 px-4 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl shadow-md hover:shadow-lg transition-all active:scale-95 flex items-center justify-center space-x-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Yes, Delete</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* BLOG CREATE / EDIT MODAL */}
      {isBlogModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <BookOpen className="w-5 h-5 text-[#004b93]" />
                <h3 className="text-lg font-bold text-slate-900">
                  {editingBlog ? 'Edit Blog Article' : 'Add New Blog Article'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsBlogModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveBlog} className="space-y-4">
              {/* Title */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Article Title *</label>
                <input
                  type="text"
                  required
                  value={blogForm.title}
                  onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                  placeholder="e.g. Clinical Importance of Regular Blood Checkups"
                  className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#004b93] focus:outline-none"
                />
              </div>

              {/* Date */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Publication Date</label>
                <div className="relative">
                  <input
                    type="text"
                    value={blogForm.date}
                    onChange={(e) => setBlogForm({ ...blogForm, date: e.target.value })}
                    placeholder="e.g. Jan 18 or Oct 8, 2026"
                    className="w-full text-xs p-3 pl-9 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#004b93] focus:outline-none font-medium"
                  />
                  <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
                <p className="text-[10px] text-slate-400">
                  Displayed on the blog badge. e.g. &quot;Jan 18&quot; or today&apos;s date.
                </p>
              </div>

              {/* Featured Image */}
              <div className="space-y-1.5 p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                <label className="text-xs font-bold text-slate-800 flex items-center space-x-1.5">
                  <ImageIcon className="w-4 h-4 text-[#004b93]" />
                  <span>Featured Blog Image</span>
                </label>
                <div className="flex items-center space-x-3 pt-1">
                  {blogForm.image && (
                    <img
                      src={blogForm.image}
                      alt="Blog Preview"
                      className="h-16 w-24 object-cover rounded-lg border border-slate-200 shadow-xs"
                      onError={(e) => {
                        e.target.src = '/banners/banner_original.png';
                      }}
                    />
                  )}
                  <div className="flex-1 space-y-2">
                    <label className="cursor-pointer inline-flex items-center space-x-1.5 px-4 py-2 bg-white border border-slate-300 text-slate-700 text-xs font-bold rounded-xl hover:bg-slate-50 shadow-xs">
                      <Upload className="w-3.5 h-3.5 text-[#004b93]" />
                      <span>{uploadingBlogImg ? 'Uploading...' : 'Upload Image File'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleBlogImageUpload}
                        disabled={uploadingBlogImg}
                      />
                    </label>
                    <input
                      type="text"
                      value={blogForm.image}
                      onChange={(e) => setBlogForm({ ...blogForm, image: e.target.value })}
                      placeholder="Or enter image URL (e.g. /blog/blood-sample.png)"
                      className="w-full text-xs p-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#004b93] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Summary / Description */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Card Summary / Description</label>
                <textarea
                  rows="3"
                  value={blogForm.summary}
                  onChange={(e) => setBlogForm({ ...blogForm, summary: e.target.value })}
                  placeholder="Short 2-3 sentence overview displayed on the homepage card..."
                  className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#004b93] focus:outline-none"
                />
                <p className="text-[10px] text-slate-400">
                  This summary is visible directly on the storefront blog card.
                </p>
              </div>

              {/* Full Content */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Full Article Content (Reader Popup)</label>
                <textarea
                  rows="5"
                  value={blogForm.content}
                  onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                  placeholder="Write full article details here. This opens when visitors click on the blog card..."
                  className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#004b93] focus:outline-none leading-relaxed"
                />
                <p className="text-[10px] text-slate-400">
                  If left empty, the summary text will be used when reading the full article.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsBlogModalOpen(false)}
                  className="px-5 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploadingBlogImg}
                  className="px-6 py-2.5 text-xs font-bold bg-[#004b93] text-white rounded-xl hover:bg-[#003a73] shadow transition-all active:scale-95"
                >
                  {editingBlog ? 'Save Changes' : 'Publish Article'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* BLOG PERMANENT DELETION CONFIRMATION MODAL */}
      {deleteBlogModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl space-y-5 text-center border border-slate-200">
            {/* Warning Icon Badge */}
            <div className="w-16 h-16 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto shadow-inner">
              <AlertTriangle className="w-8 h-8" />
            </div>

            {/* Title & Warning Message */}
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-slate-900">
                Permanent Deletion Confirmation
              </h3>
              <p className="text-sm font-bold text-rose-600 bg-rose-50 py-2.5 px-3 rounded-xl border border-rose-100">
                ⚠️ It will not recover. Are you sure?
              </p>
              <p className="text-xs text-slate-500 leading-relaxed pt-1">
                Blog article &quot;<span className="font-bold text-slate-800">{deleteBlogModal.title}</span>&quot; will be permanently deleted from the database file and cannot be restored.
              </p>
            </div>

            {/* Action Buttons: Yes / No */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeleteBlogModal({ isOpen: false, targetId: null, title: '' })}
                className="w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors"
              >
                No, Cancel
              </button>

              <button
                type="button"
                onClick={handleConfirmDeleteBlog}
                className="w-full py-2.5 px-4 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl shadow-md hover:shadow-lg transition-all active:scale-95 flex items-center justify-center space-x-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Yes, Delete</span>
              </button>
            </div>
          </div>
        </div>
      )}
        </>
      )}

    </div>
  );
}
