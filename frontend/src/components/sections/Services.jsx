import React, { useState } from 'react';
import { motion } from 'framer-motion';
import '../css/Services.css';
import OfferingDetailModal from './OfferingDetailModal';

import service1 from '../../assets/826bb818b29cc44150e12970da04fd9ba5167b91.png';
import service2 from '../../assets/50890a46240fc48c66bf9036bd63303afee0193c.png';
import service3 from '../../assets/9e717de9d8db97563969ee01cf0d50526433651d.png';
import service4 from '../../assets/1674709d7e2e3706185e5699932ba4a2ee107b43.png';

const Services = () => {
    const services = [
        {
            id: 'family-constellation',
            title: 'Family Constellation Therapy',
            subtitle: 'Ancestral Healing',
            image: service1
        },
        {
            id: 'inner-child-healing',
            title: 'Inner Child Healing',
            subtitle: 'Break the Patterns',
            image: service2
        },
        {
            id: 'transpersonal-hypnotherapy',
            title: 'Transpersonal Hypnotherapy',
            subtitle: 'Regression Therapy',
            image: service3
        },
        {
            id: 'holistic-healing',
            title: 'Holistic Integrated Creative Arts Therapy',
            subtitle: 'Process-led Healing',
            image: service4
        }
    ];

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedOfferingId, setSelectedOfferingId] = useState(null);

    const handleOpenModal = (id) => {
        setSelectedOfferingId(id);
        setIsModalOpen(true);
    };

    return (
        <section className="services">
            <motion.h2
                className="section-title"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
            >
                Core Services
            </motion.h2>

            <div className="services-grid">
                {services.map((service, index) => (
                    <motion.div
                        key={index}
                        className="service-card"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: index * 0.2 }}
                        onClick={() => handleOpenModal(service.id)}
                        style={{ cursor: 'pointer' }}
                    >
                        <div className="oval-image-container">
                            <img src={service.image} alt={service.title} />
                        </div>
                        <h3>{service.title}</h3>
                        <p>{service.subtitle}</p>
                    </motion.div>
                ))}
            </div>

            <OfferingDetailModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                offeringId={selectedOfferingId}
            />
        </section >
    );
};

export default Services;
