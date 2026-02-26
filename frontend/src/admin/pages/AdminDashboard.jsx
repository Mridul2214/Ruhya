import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Edit2, Layout, Image as ImageIcon, Type, LogOut } from 'lucide-react';
import api from '../utils/api';
import '../css/AdminDashboard.css';

const AdminDashboard = () => {
    const [sections, setSections] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchSections();
    }, []);

    const fetchSections = async () => {
        try {
            const response = await api.get('/content');
            setSections(response.data);
        } catch (err) {
            console.error('Error fetching sections:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('ruhiya_admin_token');
        navigate('/admin/login');
    };

    const sectionIcons = {
        hero: <Layout className="section-icon" />,
        about: <Type className="section-icon" />,
        therapy: <Layout className="section-icon" />,
        services: <Layout className="section-icon" />,
        journey: <Layout className="section-icon" />,
    };

    return (
        <div className="admin-dashboard">
            <nav className="admin-nav">
                <div className="nav-brand">
                    <span className="brand-text">Ruh'ya CMS</span>
                </div>
                <button onClick={handleLogout} className="logout-btn">
                    <LogOut size={18} />
                    Logout
                </button>
            </nav>

            <main className="dashboard-content">
                <header className="dashboard-header">
                    <h1>Site Content Management</h1>
                    <p>Manage your website text and images from one central place.</p>
                </header>

                {isLoading ? (
                    <div className="loading-state">Loading sections...</div>
                ) : (
                    <div className="sections-grid">
                        {sections.map((section, index) => (
                            <motion.div
                                key={section._id}
                                className="section-card"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <div className="card-icon-wrapper">
                                    {sectionIcons[section.section] || <Layout className="section-icon" />}
                                </div>
                                <div className="card-info">
                                    <h3>{section.section.charAt(0).toUpperCase() + section.section.slice(1)}</h3>
                                    <p>{section.title || 'No title set'}</p>
                                </div>
                                <Link to={`/admin/edit/${section.section}`} className="edit-link">
                                    <Edit2 size={18} />
                                    Edit Section
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};

export default AdminDashboard;
