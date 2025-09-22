import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Shield, 
  FileCheck, 
  AlertCircle, 
  CheckCircle, 
  Calendar,
  TrendingUp,
  Building,
  DollarSign 
} from 'lucide-react';
import { COLLINS_STREET_MOCK_DATA } from '@/data/mockData';

export const APRAComplianceDashboard = () => {
  const data = COLLINS_STREET_MOCK_DATA;

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'compliant':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'review required':
        return <AlertCircle className="h-4 w-4 text-orange-500" />;
      default:
        return <Shield className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case 'compliant':
        return 'default';
      case 'review required':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  return (
    <div className="space-y-6">
      {/* Compliance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Object.entries(data.propertyAnalysis.analysis_result.compliance.detailed).map(([key, compliance]: [string, any]) => (
          <Card key={key}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                {getStatusIcon(compliance.status)}
                {key.toUpperCase()}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold">{compliance.score}%</span>
                  <Badge variant={getStatusVariant(compliance.status)}>
                    {compliance.status}
                  </Badge>
                </div>
                <Progress value={compliance.score} className="h-2" />
                <div className="text-xs text-muted-foreground">
                  Last audit: {compliance.last_audit}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* APRA CPS 230 Detail */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-blue-500" />
            APRA CPS 230 Operational Resilience
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-2">
              <div className="font-medium">Business Continuity</div>
              <div className="text-sm text-muted-foreground">
                RTO: 4 hours<br />
                RPO: 1 hour<br />
                Last test: 2023-11-15
              </div>
              <Badge variant="default">Compliant</Badge>
            </div>
            <div className="space-y-2">
              <div className="font-medium">Data Security</div>
              <div className="text-sm text-muted-foreground">
                Encryption: AES-256<br />
                Access controls: MFA<br />
                Audit trail: Complete
              </div>
              <Badge variant="default">Compliant</Badge>
            </div>
            <div className="space-y-2">
              <div className="font-medium">Third-Party Management</div>
              <div className="text-sm text-muted-foreground">
                Critical vendors: 12<br />
                Risk assessments: 100%<br />
                Contingency plans: Active
              </div>
              <Badge variant="default">Compliant</Badge>
            </div>
            <div className="space-y-2">
              <div className="font-medium">Incident Management</div>
              <div className="text-sm text-muted-foreground">
                2023 incidents: 3<br />
                Avg resolution: 6.2 hrs<br />
                Escalation protocol: Tested
              </div>
              <Badge variant="default">Compliant</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* LVR Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-green-500" />
              LVR Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-muted-foreground">Property Value</div>
                  <div className="text-xl font-bold">$8.5M</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Loan Amount</div>
                  <div className="text-xl font-bold">$5.95M</div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>LVR Ratio</span>
                  <span>70%</span>
                </div>
                <Progress value={70} className="h-3" />
                <div className="text-xs text-muted-foreground mt-1">
                  Acceptable range (≤80%)
                </div>
              </div>
              <Badge variant="default" className="w-full justify-center">
                APRA Compliant
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5 text-purple-500" />
              Portfolio Risk Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Low Risk (≤60% LVR)</span>
                <div className="flex items-center gap-2">
                  <Progress value={35} className="h-2 w-20" />
                  <span className="text-sm">35%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Medium Risk (60-80% LVR)</span>
                <div className="flex items-center gap-2">
                  <Progress value={45} className="h-2 w-20" />
                  <span className="text-sm">45%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">High Risk (&gt;80% LVR)</span>
                <div className="flex items-center gap-2">
                  <Progress value={20} className="h-2 w-20" />
                  <span className="text-sm">20%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Regulatory Reporting */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileCheck className="h-5 w-5 text-orange-500" />
            Regulatory Reporting Schedule
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <div className="font-medium">Upcoming Reports</div>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>APRA Monthly</span>
                  <Badge variant="outline">Jan 15</Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Risk Exposure</span>
                  <Badge variant="outline">Mar 31</Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span>CPS 230 Cert</span>
                  <Badge variant="outline">Jun 30</Badge>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="font-medium">Status</div>
              <div className="space-y-1">
                <Badge variant="default" className="w-full justify-center">Prepared</Badge>
                <Badge variant="secondary" className="w-full justify-center">Not Started</Badge>
                <Badge variant="secondary" className="w-full justify-center">In Progress</Badge>
              </div>
            </div>
            <div className="space-y-2">
              <div className="font-medium">Actions</div>
              <div className="space-y-1">
                <Button variant="outline" size="sm" className="w-full">View Report</Button>
                <Button variant="outline" size="sm" className="w-full">Start Report</Button>
                <Button variant="outline" size="sm" className="w-full">Continue</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Compliance Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-red-500" />
            Active Compliance Items
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg border border-orange-200">
              <AlertCircle className="h-5 w-5 text-orange-500 mt-0.5" />
              <div className="flex-1">
                <div className="font-medium">CPS 234: Encryption Standards Update</div>
                <div className="text-sm text-muted-foreground">
                  Encryption standards update required by 2024-03-31
                </div>
                <div className="mt-2">
                  <Badge variant="outline">High Priority</Badge>
                </div>
              </div>
              <Button size="sm" variant="outline">
                View Details
              </Button>
            </div>

            <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <Calendar className="h-5 w-5 text-blue-500 mt-0.5" />
              <div className="flex-1">
                <div className="font-medium">NCCP Annual Assessment</div>
                <div className="text-sm text-muted-foreground">
                  Annual borrower assessment due 2024-02-15
                </div>
                <div className="mt-2">
                  <Badge variant="outline">Medium Priority</Badge>
                </div>
              </div>
              <Button size="sm" variant="outline">
                Schedule
              </Button>
            </div>

            <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
              <TrendingUp className="h-5 w-5 text-green-500 mt-0.5" />
              <div className="flex-1">
                <div className="font-medium">Audit Logs Extension</div>
                <div className="text-sm text-muted-foreground">
                  Data retention audit logs need 7-year extension
                </div>
                <div className="mt-2">
                  <Badge variant="outline">Low Priority</Badge>
                </div>
              </div>
              <Button size="sm" variant="outline">
                Configure
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};