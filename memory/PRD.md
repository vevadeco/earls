# Earl's Landscaping - Lead Generation Funnel PRD

## Original Problem Statement
Build a lead generation funnel website for Earl's Landscaping, a landscaping business in Hamilton, Ontario that provides landscaping services in Hamilton and the GTA.

## User Personas
1. **Homeowners** - Residential property owners in Hamilton/GTA looking for landscaping services
2. **Property Managers** - Managing multiple properties needing ongoing maintenance
3. **New Homeowners** - Recently moved, need yard transformation

## Core Requirements (Static)
- Lead capture form with Name, Email, Phone, Service Type
- Services: Lawn Care & Maintenance, Garden Planting, Hardscaping
- Store leads in MongoDB database
- Earthy/natural color scheme (greens, browns)
- Testimonials section with 4.8 star rating
- Service area map for Greater Toronto & Hamilton Area

## What's Been Implemented (Dec 2025)

### Backend
- FastAPI server with `/api/leads` POST endpoint
- Lead model: name, email, phone, service_type, created_at
- MongoDB integration for lead storage
- GET `/api/leads` for admin access

### Frontend
- **Navbar**: Sticky navigation with logo, links, CTA button, mobile menu
- **Hero Section**: Split layout with value proposition and embedded lead form
- **Services Section**: Bento grid showcasing 3 services with images
- **Testimonials Section**: 6 testimonials with 4.8 star overall rating
- **Service Area Section**: Interactive map with Hamilton HQ and GTA coverage
- **Footer**: Contact info, services, areas, business hours

### Design
- Color palette: Forest Green (#2F5233), Warm Sand (#F9F7F2), Accent (#D2691E)
- Typography: DM Serif Display (headings), Outfit (body)
- Fully responsive design
- Subtle animations and hover effects

## Technology Stack
- Frontend: React, Tailwind CSS, Shadcn UI
- Backend: FastAPI, Motor (async MongoDB)
- Database: MongoDB

## Prioritized Backlog

### P0 (Critical) - COMPLETED
- [x] Lead capture form
- [x] Backend API for leads
- [x] All landing page sections

### P1 (High Priority) - Future
- [ ] Email notifications for new leads
- [ ] Admin dashboard to view/manage leads
- [ ] Lead export to CSV

### P2 (Medium Priority) - Future
- [ ] Photo gallery of past work
- [ ] Scheduling/booking integration
- [ ] Live chat widget
- [ ] SEO optimization

### P3 (Nice to Have)
- [ ] Multi-language support (French)
- [ ] Customer portal
- [ ] Quote calculator

## Next Tasks
1. Add email notifications when leads are submitted
2. Build admin dashboard to view/filter leads
3. Add more testimonials or integrate with Google Reviews
4. Implement analytics tracking (conversion rates)
