'use client';

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Activity } from 'lucide-react';

export default function BlogSection() {
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);

  const fallbackBlogs = [
    {
      id: "blog-1",
      title: "The ENT specialist",
      date: "Jan 18",
      image: "/blog/ent-specialist.png",
      summary: "Modern diagnostic endoscopy, headlamps, and clinical instruments transforming patient diagnosis.",
      content: "Ear, Nose, and Throat specialists require ultra-precise clinical tools for examination and treatment. Global Cure RX Pharmacy provides top-tier otoscopes, tongue depressors, and sterilization equipment trusted by clinics nationwide."
    },
    {
      id: "blog-2",
      title: "The blood sample",
      date: "Jan 18",
      image: "/blog/blood-sample.png",
      summary: "Sterile phlebotomy techniques, vacuum collection tubes, and safe disposal protocols.",
      content: "Preventing cross-contamination and preserving blood sample integrity are essential foundations of medical laboratory science. Learn about our range of sterile vacuum tubes, safety lancets, and tourniquets."
    },
    {
      id: "blog-3",
      title: "Stethoscope and notepad",
      date: "Jan 18",
      image: "/blog/stethoscope.png",
      summary: "Acoustic sensitivity, pediatric diaphragms, and durable cardiology stethoscopes.",
      content: "A reliable stethoscope remains the primary diagnostic instrument of any medical professional. Our selection includes dual-head stainless steel stethoscopes engineered for exceptional clarity and acoustic precision."
    }
  ];

  useEffect(() => {
    fetch('/api/blogs')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setBlogs(data);
        } else {
          setBlogs(fallbackBlogs);
        }
      })
      .catch(() => setBlogs(fallbackBlogs));
  }, []);

  const displayBlogs = blogs.length > 0 ? blogs : fallbackBlogs;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-slate-100">
      {/* Blog Heading with ECG Pulse Wave */}
      <div className="text-center max-w-2xl mx-auto space-y-3 mb-8">
        <div className="flex items-center justify-center space-x-3">
          {/* Left Pulse */}
          <svg className="w-12 h-6 text-cyan-400 stroke-current" viewBox="0 0 100 30" fill="none">
            <path d="M0 15 H40 L45 3 L55 27 L60 15 H100" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002b5c] tracking-tight">
            From Our Blog
          </h2>
          {/* Right Pulse */}
          <svg className="w-12 h-6 text-cyan-400 stroke-current" viewBox="0 0 100 30" fill="none">
            <path d="M0 15 H40 L45 3 L55 27 L60 15 H100" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
          Stay informed with medical updates, healthcare tips, and product insights from our pharmacy team.
        </p>
      </div>

      {/* Navigation arrows */}
      <div className="flex justify-end space-x-2 mb-4">
        <button
          aria-label="Previous articles"
          className="p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          aria-label="Next articles"
          className="p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Blog Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {displayBlogs.map((blog) => (
          <div
            key={blog.id}
            onClick={() => setSelectedBlog(blog)}
            className="group cursor-pointer bg-white rounded-xl overflow-hidden border border-slate-100 hover:shadow-lg transition-all duration-300"
          >
            {/* Image */}
            <div className="w-full h-44 bg-slate-100 overflow-hidden relative">
              <img
                src={blog.image || '/blog/ent-specialist.png'}
                alt={blog.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  e.target.src = '/banners/banner_original.png';
                }}
              />
            </div>

            {/* Content */}
            <div className="p-5 text-center space-y-2">
              <h3 className="text-base font-bold text-[#002b5c] group-hover:text-[#004b93] transition-colors">
                {blog.title}
              </h3>
              <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                {blog.date}
              </p>
              <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                {blog.summary}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Blog Article Reader Modal */}
      {selectedBlog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <h3 className="text-xl font-bold text-[#002b5c]">{selectedBlog.title}</h3>
            <p className="text-xs font-semibold text-slate-400">{selectedBlog.date}</p>
            <img
              src={selectedBlog.image}
              alt={selectedBlog.title}
              className="w-full h-48 object-cover rounded-xl"
            />
            <p className="text-sm text-slate-700 leading-relaxed">{selectedBlog.content}</p>
            <div className="text-right pt-2">
              <button
                onClick={() => setSelectedBlog(null)}
                className="px-5 py-2 bg-[#004b93] text-white text-xs font-bold rounded-full"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
