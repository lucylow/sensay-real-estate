import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const CompliancePage: React.FC = () => {
  const complianceStatus = {
    'APRA CPS 230': { status: 'Compliant', score: 98, lastAudit: '2024-01-08' },
    'NCCP Act': { status: 'Compliant', score: 95, lastAudit: '2024-01-07' },
    'Basel III': { status: 'Compliant', score: 92, lastAudit: '2024-01-06' },
    'Risk Management': { status: 'Compliant', score: 96, lastAudit: '2024-01-08' }
  };

  const lvrAnalysis = {
    under80: { count: 847, percentage: 68 },
    '80to90': { count: 289, percentage: 23 },
    '90to95': { count: 87, percentage: 7 },
    over95: { count: 24, percentage: 2 }
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Compliance Overview</TabsTrigger>
          <TabsTrigger value="apra">APRA CPS 230</TabsTrigger>
          <TabsTrigger value="lvr">LVR Analysis</TabsTrigger>
          <TabsTrigger value="reporting">Reporting</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(complianceStatus).map(([standard, data]) => (
              <Card key={standard}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">{standard}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-2xl font-bold">{data.score}%</div>
                    <Badge variant="default">{data.status}</Badge>
                  </div>
                  <Progress value={data.score} className="mb-2" />
                  <p className="text-xs text-muted-foreground">
                    Last audit: {new Date(data.lastAudit).toLocaleDateString()}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Compliance Dashboard</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">98.7%</div>
                  <p className="text-sm text-muted-foreground">Overall Compliance Score</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">1,247</div>
                  <p className="text-sm text-muted-foreground">Properties Assessed</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">24/7</div>
                  <p className="text-sm text-muted-foreground">Continuous Monitoring</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="apra" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>APRA CPS 230 - Operational Risk Management</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <span className="font-medium text-green-800">Fully Compliant</span>
                </div>
                <p className="text-sm text-green-700">
                  All operational risk management requirements are met, including business continuity, 
                  service provider management, and incident management.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Business Continuity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Progress value={100} className="mb-2" />
                    <p className="text-xs text-muted-foreground">Disaster recovery tested quarterly</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Data Security</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Progress value={98} className="mb-2" />
                    <p className="text-xs text-muted-foreground">Encryption & access controls active</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Service Provider Management</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Progress value={96} className="mb-2" />
                    <p className="text-xs text-muted-foreground">All providers assessed and monitored</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Incident Management</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Progress value={94} className="mb-2" />
                    <p className="text-xs text-muted-foreground">Response procedures documented</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="lvr" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Loan-to-Value Ratio Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                {Object.entries(lvrAnalysis).map(([range, data]) => (
                  <Card key={range}>
                    <CardContent className="p-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold">{data.count}</div>
                        <p className="text-sm text-muted-foreground">
                          {range === 'under80' ? '<80%' : 
                           range === '80to90' ? '80-90%' :
                           range === '90to95' ? '90-95%' : '>95%'} LVR
                        </p>
                        <div className="mt-2">
                          <Progress value={data.percentage} />
                          <p className="text-xs text-muted-foreground mt-1">{data.percentage}% of portfolio</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-800 mb-2">Portfolio Risk Assessment</h4>
                <p className="text-sm text-yellow-700">
                  68% of valuations fall within the conservative under 80% LVR range, indicating a low-risk portfolio. 
                  Only 2% exceed 95% LVR, well within acceptable risk parameters.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reporting" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Regulatory Reporting</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Monthly APRA Report</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Due: Jan 15, 2024</span>
                      <Badge variant="default">Ready</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Operational risk metrics and compliance status
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Quarterly Risk Assessment</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Due: Jan 31, 2024</span>
                      <Badge variant="secondary">In Progress</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Comprehensive portfolio risk analysis
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold">Recent Reports</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-2 bg-muted rounded">
                    <span className="text-sm">APRA Monthly - December 2023</span>
                    <Badge variant="outline">Submitted</Badge>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-muted rounded">
                    <span className="text-sm">Basel III Capital Report - Q4 2023</span>
                    <Badge variant="outline">Submitted</Badge>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-muted rounded">
                    <span className="text-sm">Risk Dashboard - December 2023</span>
                    <Badge variant="outline">Submitted</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};