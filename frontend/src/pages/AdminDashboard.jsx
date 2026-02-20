import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Leaf,
  LogOut,
  Users,
  Eye,
  TrendingUp,
  Download,
  MoreVertical,
  Trash2,
  RefreshCw,
  Phone,
  Mail,
  Calendar,
} from "lucide-react";
import { toast } from "sonner";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [leads, setLeads] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  const getAuthHeaders = () => ({
    Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
  });

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [leadsRes, analyticsRes] = await Promise.all([
        axios.get(`${API}/admin/leads`, { headers: getAuthHeaders() }),
        axios.get(`${API}/admin/analytics`, { headers: getAuthHeaders() }),
      ]);
      setLeads(leadsRes.data);
      setAnalytics(analyticsRes.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      if (error.response?.status === 401) {
        localStorage.removeItem("admin_token");
        navigate("/admin/login");
      } else {
        toast.error("Failed to load data");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    navigate("/admin/login");
  };

  const handleStatusChange = async (leadId, newStatus) => {
    try {
      await axios.patch(
        `${API}/admin/leads/${leadId}/status?status=${newStatus}`,
        {},
        { headers: getAuthHeaders() }
      );
      setLeads(
        leads.map((lead) =>
          lead.id === leadId ? { ...lead, status: newStatus } : lead
        )
      );
      toast.success("Status updated");
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const handleDeleteLead = async (leadId) => {
    if (!window.confirm("Are you sure you want to delete this lead?")) return;

    try {
      await axios.delete(`${API}/admin/leads/${leadId}`, {
        headers: getAuthHeaders(),
      });
      setLeads(leads.filter((lead) => lead.id !== leadId));
      toast.success("Lead deleted");
    } catch (error) {
      toast.error("Failed to delete lead");
    }
  };

  const handleExport = async () => {
    try {
      const response = await axios.get(`${API}/admin/leads/export`, {
        headers: getAuthHeaders(),
      });
      const blob = new Blob([response.data.csv], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = response.data.filename;
      a.click();
      window.URL.revokeObjectURL(url);
      toast.success("Export downloaded");
    } catch (error) {
      toast.error("Failed to export leads");
    }
  };

  const getServiceLabel = (serviceType) => {
    const labels = {
      "lawn-care": "Lawn Care",
      "garden-planting": "Garden Planting",
      hardscaping: "Hardscaping",
      "full-service": "Full Service",
    };
    return labels[serviceType] || serviceType;
  };

  const getStatusColor = (status) => {
    const colors = {
      new: "bg-blue-100 text-blue-800",
      contacted: "bg-yellow-100 text-yellow-800",
      qualified: "bg-purple-100 text-purple-800",
      converted: "bg-green-100 text-green-800",
      lost: "bg-red-100 text-red-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  const statuses = ["new", "contacted", "qualified", "converted", "lost"];

  return (
    <div className="min-h-screen bg-muted/30" data-testid="admin-dashboard">
      {/* Header */}
      <header className="bg-primary text-primary-foreground shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                <Leaf className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h1 className="font-heading text-xl">Earl's Landscaping</h1>
                <p className="text-xs text-primary-foreground/70 font-body">
                  Admin Dashboard
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={fetchData}
                className="text-primary-foreground hover:bg-primary-foreground/10"
                data-testid="refresh-btn"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="text-primary-foreground hover:bg-primary-foreground/10"
                data-testid="logout-btn"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <Card data-testid="stat-total-leads">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-body text-sm text-muted-foreground">
                        Total Leads
                      </p>
                      <p className="font-heading text-3xl text-foreground">
                        {analytics?.total_leads || 0}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <Users className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <p className="font-body text-xs text-muted-foreground mt-2">
                    {analytics?.leads_today || 0} today
                  </p>
                </CardContent>
              </Card>

              <Card data-testid="stat-total-visitors">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-body text-sm text-muted-foreground">
                        Page Views
                      </p>
                      <p className="font-heading text-3xl text-foreground">
                        {analytics?.total_page_views || 0}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-secondary/30 rounded-full flex items-center justify-center">
                      <Eye className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <p className="font-body text-xs text-muted-foreground mt-2">
                    {analytics?.visitors_today || 0} today
                  </p>
                </CardContent>
              </Card>

              <Card data-testid="stat-conversion-rate">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-body text-sm text-muted-foreground">
                        Conversion Rate
                      </p>
                      <p className="font-heading text-3xl text-foreground">
                        {analytics?.conversion_rate || 0}%
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-accent" />
                    </div>
                  </div>
                  <p className="font-body text-xs text-muted-foreground mt-2">
                    Visitors to leads
                  </p>
                </CardContent>
              </Card>

              <Card data-testid="stat-weekly">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-body text-sm text-muted-foreground">
                        This Week
                      </p>
                      <p className="font-heading text-3xl text-foreground">
                        {analytics?.leads_this_week || 0}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                  <p className="font-body text-xs text-muted-foreground mt-2">
                    {analytics?.visitors_this_week || 0} visitors
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Daily Stats Chart */}
            {analytics?.daily_stats && analytics.daily_stats.length > 0 && (
              <Card className="mb-8" data-testid="daily-stats-chart">
                <CardHeader>
                  <CardTitle className="font-heading text-lg">
                    Last 7 Days Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-end justify-between gap-2 h-40">
                    {analytics.daily_stats.map((day, index) => (
                      <div
                        key={day.date}
                        className="flex-1 flex flex-col items-center gap-1"
                      >
                        <div className="w-full flex flex-col items-center gap-1">
                          <div
                            className="w-full bg-primary/20 rounded-t"
                            style={{
                              height: `${Math.max(
                                (day.visitors /
                                  Math.max(
                                    ...analytics.daily_stats.map((d) => d.visitors),
                                    1
                                  )) *
                                  100,
                                4
                              )}px`,
                            }}
                          >
                            <div
                              className="w-full bg-primary rounded-t transition-all"
                              style={{
                                height: `${
                                  day.visitors > 0
                                    ? (day.leads / day.visitors) * 100
                                    : 0
                                }%`,
                              }}
                            />
                          </div>
                        </div>
                        <span className="text-xs text-muted-foreground font-body">
                          {new Date(day.date).toLocaleDateString("en-US", {
                            weekday: "short",
                          })}
                        </span>
                        <span className="text-xs font-body font-medium">
                          {day.leads}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-primary/20 rounded" />
                      <span className="text-xs font-body text-muted-foreground">
                        Page Views
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-primary rounded" />
                      <span className="text-xs font-body text-muted-foreground">
                        Leads
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Leads Table */}
            <Card data-testid="leads-table-card">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="font-heading text-lg">
                  All Leads ({leads.length})
                </CardTitle>
                <Button
                  onClick={handleExport}
                  variant="outline"
                  size="sm"
                  className="font-body"
                  data-testid="export-btn"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export CSV
                </Button>
              </CardHeader>
              <CardContent>
                {leads.length === 0 ? (
                  <div className="text-center py-12">
                    <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="font-body text-muted-foreground">
                      No leads yet. They'll appear here when someone submits the
                      form.
                    </p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="font-body font-semibold">
                            Name
                          </TableHead>
                          <TableHead className="font-body font-semibold">
                            Contact
                          </TableHead>
                          <TableHead className="font-body font-semibold">
                            Service
                          </TableHead>
                          <TableHead className="font-body font-semibold">
                            Status
                          </TableHead>
                          <TableHead className="font-body font-semibold">
                            Date
                          </TableHead>
                          <TableHead className="font-body font-semibold w-[50px]">
                            Actions
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {leads.map((lead) => (
                          <TableRow key={lead.id} data-testid={`lead-row-${lead.id}`}>
                            <TableCell className="font-body font-medium">
                              {lead.name}
                            </TableCell>
                            <TableCell>
                              <div className="flex flex-col gap-1">
                                <a
                                  href={`mailto:${lead.email}`}
                                  className="flex items-center gap-1 text-sm font-body text-muted-foreground hover:text-primary"
                                >
                                  <Mail className="w-3 h-3" />
                                  {lead.email}
                                </a>
                                <a
                                  href={`tel:${lead.phone}`}
                                  className="flex items-center gap-1 text-sm font-body text-muted-foreground hover:text-primary"
                                >
                                  <Phone className="w-3 h-3" />
                                  {lead.phone}
                                </a>
                              </div>
                            </TableCell>
                            <TableCell className="font-body">
                              {getServiceLabel(lead.service_type)}
                            </TableCell>
                            <TableCell>
                              <Select
                                value={lead.status}
                                onValueChange={(value) =>
                                  handleStatusChange(lead.id, value)
                                }
                              >
                                <SelectTrigger
                                  className={`w-[130px] h-8 text-xs font-body ${getStatusColor(
                                    lead.status
                                  )}`}
                                  data-testid={`status-select-${lead.id}`}
                                >
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {statuses.map((status) => (
                                    <SelectItem
                                      key={status}
                                      value={status}
                                      className="font-body text-xs capitalize"
                                    >
                                      {status}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </TableCell>
                            <TableCell className="font-body text-sm text-muted-foreground">
                              {new Date(lead.created_at).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 w-8 p-0"
                                    data-testid={`lead-actions-${lead.id}`}
                                  >
                                    <MoreVertical className="w-4 h-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem
                                    onClick={() => handleDeleteLead(lead.id)}
                                    className="text-destructive font-body"
                                  >
                                    <Trash2 className="w-4 h-4 mr-2" />
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
