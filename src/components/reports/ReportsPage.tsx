import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import ValuationReport from '../ValuationReport';

export const ReportsPage: React.FC = () => {
  const [selectedProperty, setSelectedProperty] = useState('123 Collins Street');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState('');
  const [dialogTitle, setDialogTitle] = useState('');

  const reportContents = {
    'Full Property Valuation': `Report 1: Comprehensive Property Valuation Report
Report ID: PG-VR-2024-123COLLINS

Key Findings:
Valuation Methodology: Combined sales comparison (55%), income capitalization (35%), and cost approach (10%)
Value Breakdown: Land $5.2M, Building $3.1M, Intangibles $200k
Risk Adjustments: -$300k flood discount, +$420k market appreciation
Strategic Recommendation: 7-10 year hold with $185k infrastructure investment

Comparative Analysis:
Property | Distance | Premium to Market
111 Collins Street | 200m | +15.6%
130 Exhibition Street | 450m | +8% above comparable
150 Lonsdale Street | 600m | +23% premium justified

Executive Summary
This comprehensive valuation report examines 123 Collins Street, a prime CBD commercial property with heritage significance. Our AI-driven analysis establishes a current market value of $8,500,000 AUD (92% confidence), reflecting its premium location while accounting for material flood exposure. The property demonstrates strong fundamentals including 98% occupancy and 4.8% yield, but requires strategic risk mitigation to preserve long-term value.

Valuation Methodology
PropGuard AI employed three valuation approaches:
- Sales Comparison: Analyzed 12 recent CBD transactions (2023-2024)
- Income Capitalization: Projected 10-year cash flows at 5.2% cap rate
- Cost Approach: Rebuild cost less depreciation

Valuation Approach Weighting:
- Sales Comparison: 55%
- Income Capitalization: 35%
- Cost Approach: 10%

Detailed Valuation Breakdown
Component | Value (AUD) | Key Drivers
Land Value | $5,200,000 | 0.12 acre CBD premium, zoning B4 mixed-use
Building Value | $3,100,000 | Heritage facade (1928), 5,200sqm GFA, 85% efficiency
Intangibles | $200,000 | "Collins Street" prestige, tenant goodwill
Total Value | $8,500,000

Risk Adjustments
Factor | Adjustment | Rationale
Flood Zone Discount | -$300,000 | Yarra River proximity (800m), 2022 flood history
Heritage Premium | +$200,000 | Facade protection increases scarcity value
Lease Expiry Risk | -$150,000 | Primary tenant lease ends 2026 (40% NLA)
Market Appreciation | +$420,000 | 12-month CBD office value growth trend

Comparative Analysis
Comparable | Distance | Value/sqm | Adjusted Value
111 Collins Street | 200m | $23,800 | $8,100,000 (-5%)
130 Exhibition Street | 450m | $22,100 | $7,800,000 (-8%)
150 Lonsdale Street | 600m | $20,500 | $6,900,000 (-19%)

Strategic Recommendations
- Immediate Action: Install IoT flood monitoring system ($4,200) to reduce insurance premiums by 18%
- Medium-Term: Negotiate lease extensions with anchor tenant (2024-2025 window)
- Capital Works: $185,000 foundation stabilization to address 2.8cm settlement
- Portfolio Strategy: Hold 7-10 years to capture infrastructure-led appreciation

"This property represents a core CBD asset with value-add potential through proactive risk management. The 70% LVR position provides flexibility for strategic capital investment."
— PropGuard AI Valuation Committee`,

    'Risk Assessment Only': `Report 2: Advanced Climate Risk Assessment
Report ID: PG-RA-2024-123COLLINS

Critical Risk Profile:
Flood Risk: 66/100 (HIGH) - Primary concern requiring immediate mitigation
Fire Risk: 24/100 (LOW-MEDIUM) - Manageable with standard precautions
Coastal Erosion: 22/100 (LOW) - Long-term monitoring required
Market Volatility: 52/100 (MEDIUM) - Cyclical risk factor

Climate Projections (2024-2070):
Year | Temperature Δ | Rainfall Δ | Property Impact
2030 | +1.4°C | -8% | 18% flood frequency increase
2050 | +2.3°C | -15% | $220k/yr cooling costs
2070 | +3.1°C | -22% | Structural integrity concerns

Mitigation Investment Plan:
- Total Cost: $279,200
- Expected Risk Reduction: 35% overall
- ROI Period: 3.2 years
- Insurance Savings: $44,000/year

Executive Summary
This risk assessment identifies flood exposure as the critical vulnerability (72/100 risk score), with climate projections indicating worsening conditions. The property faces $1.2-2.4M potential flood loss, requiring prioritized mitigation. Fire risk remains moderate (45/100) despite 4.2km bushland distance due to urban interface factors.

Climate Risk Matrix
Hazard | Current Score | 2030 Projection | Key Vulnerabilities
Flood | 72/100 (High) | 78/100 | Ground floor plant room, basement parking
Fire | 45/100 (Moderate) | 52/100 | Heritage timber elements, NE exposure
Erosion | 38/100 (Low) | 45/100 | SW foundation (sandy clay soil)

Geographic Risk Analysis
Flood Modeling:
- 100-year flood depth: 1.8m (ground floor inundation)
- Evacuation challenge: Collins Street bottleneck during peak hours
- Insurance implications: $50,000 excess for water damage claims

Fire Spread Simulation:
Bushland → EmberAttack_4.2km → Property NE Facade → Heritage timber elements → Main structure ignition

Climate Projections
Year | Temp Δ | Rainfall Δ | Sea Level Δ | Impact
2030 | +1.4°C | -8% | +12cm | 18% flood frequency increase
2050 | +2.3°C | -15% | +28cm | $220k/yr cooling cost increase
2070 | +3.1°C | -22% | +46cm | Structural integrity concerns

Mitigation Implementation Plan
Priority | Action | Cost (AUD) | Timeline | Risk Reduction
1 | Flood sensor network | $4,200 | 60 days | 15%
2 | Stormwater upgrade | $28,000 | 120 days | 25%
3 | Fire-resistant cladding | $62,000 | 180 days | 18%
4 | Foundation stabilization | $185,000 | 240 days | 22%

Insurance Optimization
Coverage | Current | Post-Mitigation | Savings
Annual Premium | $142,000 | $98,000 | $44,000
Water Damage Excess | $50,000 | $25,000 | 50%
Business Interruption | 90 days | 60 days | 33%`,

    'APRA Compliance Report': `Report 3: APRA CPS 230 Compliance Audit
Report ID: PG-APRA-2024-123COLLINS

Compliance Dashboard:
Regulation | Score | Status | Action Required
CPS 230 | 98% | ✅ Compliant | Minor BCP documentation
NCCP Act | 95% | ✅ Compliant | Current schedule maintained
Basel III | 92% | ✅ Compliant | Capital adequate
CPS 234 | 88% | ⚠️ Minor Issues | Encryption upgrade by Mar 31

LVR Analysis:
- Property Value: $8,500,000
- Loan Amount: $5,950,000
- LVR Ratio: 70% (Well within limits)
- Risk Category: Medium-Low
- Portfolio Context: 68% of properties <80% LVR (Conservative)

Blockchain Verification:
- NFT Token: PG-V-123COLLINS-20240108
- Blockchain: Polygon Network
- Audit Trail: 4 verification steps completed
- IPFS Storage: Permanently archived

Executive Summary
The property maintains 98% compliance with APRA CPS 230 standards, with minor remediation required for CPS 234 data security protocols by 31 March 2024. Loan exposure remains within prudent limits at 70% LVR, though climate risk factors warrant enhanced monitoring.

Compliance Status Dashboard
Regulation | Status | Score | Critical Findings
CPS 230 | Compliant | 98% | BCP testing documentation gap
NCCP Act | Compliant | 95% | Borrower reassessment overdue
Basel III | Compliant | 92% | Capital coverage adequate
CPS 234 | Remediation | 88% | Encryption standards upgrade

LVR Exposure Analysis
Portfolio Context:
- <80% (Low Risk): 68%
- 80-90% (Medium Risk): 23%
- >90% (High Risk): 9%

Subject Property:
- Valuation: $8,500,000
- Loan Amount: $5,950,000
- LVR: 70%
- Risk Category: Medium-Low

Risk Management Assessment
Business Continuity:
- RTO: 4 hours, RPO: 1 hour
- Last test: 15 Nov 2023 (Successful)
- Vulnerability: Flood impact on primary data center

Incident Management:
- 3 incidents in 2023 (avg. resolution 6.2 hours)
- Blockchain audit trail completeness: 98%

Third-Party Risk:
- 12 critical vendors
- 100% with contingency plans

Remediation Roadmap
Action Item | Regulation | Due Date | Status
AES-256 Encryption Upgrade | CPS 234 | 31 Mar 2024 | 25% Complete
DR Site Activation | CPS 230 | 30 Jun 2024 | Not Started
Borrower Reassessment | NCCP Act | 15 Feb 2024 | 80% Complete
Heritage Compliance Audit | Local Law | 31 Dec 2024 | Pending

Blockchain Verification
Valuation NFT: PG-V-123COLLINS-20240108
Audit Trail:
Valuation → Consensus: 3/3 XNodes approved
Consensus → Blockchain: Mint NFT (Polygon #42817291)
Blockchain → Compliance: APRA check passed
Compliance → Reporting: Certified documentation`,

    'Market Analysis': `Report 4: Market Intelligence & Investment Analysis
Report ID: PG-MA-2024-123COLLINS

Market Position:
- Price Premium: 15.6% above CBD average ($1,000/sqm vs $865/sqm)
- Vacancy Advantage: 2.1% vs 18% CBD average (88% superior occupancy)
- Yield Performance: 5.2% vs 4.5% market average

Investment Scenarios (6-Year Projections):
Scenario | Probability | 2030 Value | IRR
Base Case | 65% | $10.45M | 7.2%
Interest Rise | 25% | $9.2M | 4.1%
Flood Event | 8% | $8.1M | 1.8%
With Mitigation | Recommended | $11.1M | 8.9%

Strategic Recommendations:
- Risk Mitigation: $110k investment for 2.3x ROI
- Debt Optimization: Fix 60% at current rates
- Exit Strategy: Pre-2032 optimal timing
- Green Financing: 70bp savings available

Executive Summary
Melbourne CBD commercial market shows resilience with 4.2% YoY value growth, though climate risk differentiation is emerging. 123 Collins Street commands a 15.6% price/sqm premium over district averages, but flood exposure creates valuation headwinds. Strategic positioning suggests 7-10 year hold period with $110k mitigation investment unlocking 23% upside.

Market Position Matrix
Metric | Subject Property | CBD Average | Premium/Deficit
Price/sqm | $24,500 | $21,200 | +15.6%
Yield | 4.8% | 4.2% | +14.3%
Vacancy Rate | 2.1% | 5.8% | -64%
Climate Risk Discount | 3.5% | 1.8% | +94%

Trend Analysis
Key Market Drivers:
- Office Conversion: 12% increase in residential conversions (2023)
- Infrastructure Impact: Metro Tunnel completion (2025) adds 8% value uplift
- Climate Pricing: Flood zone premiums up 22% since 2022
- Interest Rates: Every +0.5% reduces values 1.8%

Demand Sectors:
- Financial Services: 35%
- Legal: 25%
- Tech: 22%
- Consulting: 18%

Investment Scenario Modeling
Scenario | Probability | 2024 Value | 2030 Value | IRR
Base Case | 65% | $8,500,000 | $10,450,000 | 7.2%
Interest Rate +2% | 25% | $7,900,000 | $9,200,000 | 4.1%
Major Flood Event | 8% | $7,200,000 | $8,100,000 | 1.8%
With Mitigation | N/A | $8,620,000* | $11,100,000 | 8.9%

Strategic Recommendations
Capital Deployment:
- Allocate $110k to flood mitigation (2.3x ROI)
- Target green financing at 4.35% (70bp savings)

Lease Strategy:
- Renew anchor tenant pre-2026 (current: $420/sqm vs market $480)
- Introduce climate risk-adjusted lease clauses

Portfolio Positioning:
- Hold through 2030 infrastructure premium window
- Hedge interest rate exposure with 25% fixed debt

"123 Collins Street represents a value-add opportunity in a transitioning market. Proactive risk management can convert climate vulnerability into competitive advantage."
— PropGuard AI Research Division

Blockchain Certification
All reports secured on Polygon:
- NFT: PG-REP-123COLLINS-20240115
- Transaction: 0x4a7c2...e9f1b
- Timestamp: 2024-01-15 14:22:18 AEST
- View Verification: PolygonScan Explorer

PropGuard AI • APRA CPS 230 Compliant • ASIC Regulatory Technology Provider #RT-1124`
  };

  const generateReport = (templateName: string) => {
    const content = reportContents[templateName as keyof typeof reportContents];
    if (!content) return;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${templateName.replace(/\s+/g, '_')}_123_Collins_Street.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const generateCombinedReport = () => {
    const combinedContent = [
      reportContents['Full Property Valuation'],
      '\n\n' + '='.repeat(80) + '\n\n',
      reportContents['Risk Assessment Only'],
      '\n\n' + '='.repeat(80) + '\n\n',
      reportContents['APRA Compliance Report'],
      '\n\n' + '='.repeat(80) + '\n\n',
      reportContents['Market Analysis']
    ].join('');

    const blob = new Blob([combinedContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Complete_Property_Report_123_Collins_Street.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getRandomReport = () => {
    const reportKeys = Object.keys(reportContents);
    const randomKey = reportKeys[Math.floor(Math.random() * reportKeys.length)];
    return { name: randomKey, content: reportContents[randomKey as keyof typeof reportContents] };
  };

  const viewRandomReport = () => {
    const randomReport = getRandomReport();
    setDialogTitle(randomReport.name);
    setDialogContent(randomReport.content);
    setIsDialogOpen(true);
  };

  const downloadRandomReport = () => {
    const randomReport = getRandomReport();
    const blob = new Blob([randomReport.content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${randomReport.name.replace(/\s+/g, '_')}_123_Collins_Street.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const reports = [
    {
      id: 'VR-2024-001',
      property: '123 Collins Street, Melbourne VIC',
      type: 'Full Valuation',
      date: '2024-01-08',
      status: 'Complete',
      valuation: 850000
    },
    {
      id: 'VR-2024-002', 
      property: '456 George Street, Sydney NSW',
      type: 'Risk Assessment',
      date: '2024-01-07',
      status: 'Complete',
      valuation: 1200000
    },
    {
      id: 'VR-2024-003',
      property: '789 Queen Street, Brisbane QLD',
      type: 'APRA Compliance',
      date: '2024-01-06',
      status: 'In Review',
      valuation: 650000
    }
  ];

  const reportTemplates = [
    { name: 'Full Property Valuation', description: 'Comprehensive valuation with risk analysis' },
    { name: 'Risk Assessment Only', description: 'Climate and market risk evaluation' },
    { name: 'APRA Compliance Report', description: 'Regulatory compliance documentation' },
    { name: 'Market Analysis', description: 'Local market trends and comparisons' }
  ];

  return (
    <div className="space-y-6">
      <Tabs defaultValue="library" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="library">Report Library</TabsTrigger>
          <TabsTrigger value="generate">Generate Report</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="library" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Reports</CardTitle>
              <div className="flex space-x-2">
                <Input placeholder="Search reports..." className="max-w-sm" />
                <Button variant="outline">Filter</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {reports.map((report) => (
                  <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-semibold">{report.id}</h4>
                        <Badge variant={report.status === 'Complete' ? 'default' : 'secondary'}>
                          {report.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{report.property}</p>
                      <div className="flex space-x-4 text-xs text-muted-foreground mt-1">
                        <span>Type: {report.type}</span>
                        <span>Date: {new Date(report.date).toLocaleDateString()}</span>
                        <span>Value: ${report.valuation.toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={viewRandomReport}>View</Button>
                      <Button variant="outline" size="sm" onClick={downloadRandomReport}>Download</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="generate" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Generate New Report</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Property Address</label>
                  <Input 
                    placeholder="Enter property address" 
                    value={selectedProperty}
                    onChange={(e) => setSelectedProperty(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Report Type</label>
                  <select className="w-full p-2 border rounded-md">
                    <option>Full Valuation Report</option>
                    <option>Risk Assessment Only</option>
                    <option>APRA Compliance Report</option>
                    <option>Market Analysis</option>
                  </select>
                </div>
              </div>

              <div className="bg-muted p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Report Preview</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>Property: {selectedProperty}</div>
                  <div>Type: Full Valuation Report</div>
                  <div>Estimated Time: 2-3 minutes</div>
                  <div>Includes: Valuation, Risk, Compliance</div>
                </div>
              </div>

              <Button className="w-full" onClick={generateCombinedReport}>Generate Report</Button>
            </CardContent>
          </Card>

          {/* Sample Report Preview */}
          <Card>
            <CardHeader>
              <CardTitle>Sample Report Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">Sample valuation report would appear here with full property analysis, risk assessment, and compliance information.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Report Templates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {reportTemplates.map((template) => (
                  <Card key={template.name}>
                    <CardContent className="p-4">
                      <h4 className="font-semibold mb-2">{template.name}</h4>
                      <p className="text-sm text-muted-foreground mb-3">{template.description}</p>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">Preview</Button>
                        <Button size="sm" onClick={() => generateReport(template.name)}>Generate Report</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-3xl font-bold text-blue-600">247</div>
                <p className="text-sm text-muted-foreground">Reports Generated</p>
                <p className="text-xs text-green-600">+12% this month</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-3xl font-bold text-green-600">98.7%</div>
                <p className="text-sm text-muted-foreground">Accuracy Rate</p>
                <p className="text-xs text-green-600">Above target</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-3xl font-bold text-purple-600">2.3s</div>
                <p className="text-sm text-muted-foreground">Avg Generation Time</p>
                <p className="text-xs text-green-600">-15% faster</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Report Usage Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Full Valuation Reports</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-32 bg-muted rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{width: '60%'}}></div>
                    </div>
                    <span className="text-sm">147</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span>Risk Assessments</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-32 bg-muted rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{width: '25%'}}></div>
                    </div>
                    <span className="text-sm">62</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span>APRA Compliance</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-32 bg-muted rounded-full h-2">
                      <div className="bg-purple-600 h-2 rounded-full" style={{width: '15%'}}></div>
                    </div>
                    <span className="text-sm">38</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{dialogTitle}</DialogTitle>
          </DialogHeader>
          <div className="whitespace-pre-wrap text-sm">{dialogContent}</div>
        </DialogContent>
      </Dialog>
    </div>
  );
};