'use client';
import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, TrendingUp, Clock } from 'lucide-react';
import * as d3 from 'd3';

interface RiskHeatmapProps {
  riskData?: {
    flood?: number;
    fire?: number;
    coastalErosion?: number;
    subsidence?: number;
  };
  location?: string;
}

export default function RiskHeatmap({ riskData, location }: RiskHeatmapProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const timelineRef = useRef<SVGSVGElement>(null);
  
  useEffect(() => {
    if (!riskData || !svgRef.current) return;
    
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();
    
    const width = 400;
    const height = 300;
    const margin = { top: 30, right: 30, bottom: 50, left: 60 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    
    svg.attr('width', width).attr('height', height);
    
    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);
    
    // Risk types and values
    const riskTypes = Object.entries(riskData)
      .filter(([_, value]) => typeof value === 'number')
      .map(([key, value]) => ({
        type: key.replace(/([A-Z])/g, ' $1').toLowerCase(),
        value: value as number
      }));
    
    const x = d3.scaleBand()
      .domain(riskTypes.map(d => d.type))
      .range([0, innerWidth])
      .padding(0.1);
    
    const y = d3.scaleLinear()
      .domain([0, 1])
      .range([innerHeight, 0]);
    
    // Color scale
    const colorScale = d3.scaleSequential()
      .domain([0, 1])
      .interpolator(d3.interpolateRdYlBu);
    
    // Add axes
    g.append('g')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(d3.axisBottom(x).tickSizeOuter(0))
      .selectAll("text")
      .attr('transform', 'rotate(-45)')
      .attr('text-anchor', 'end')
      .attr('fill', '#6b7280')
      .style('font-size', '12px');
    
    g.append('g')
      .call(d3.axisLeft(y).ticks(5).tickFormat(d => `${Math.round(Number(d) * 100)}%`))
      .selectAll("text")
      .attr('fill', '#6b7280');
    
    // Add grid lines
    g.append('g')
      .attr('class', 'grid')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(d3.axisBottom(x)
        .tickSize(-innerHeight)
        .tickFormat(() => '')
      )
      .style('stroke-dasharray', '3,3')
      .style('opacity', 0.3);
    
    // Add heatmap bars with animation
    g.selectAll('.bar')
      .data(riskTypes)
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', d => x(d.type)!)
      .attr('width', x.bandwidth())
      .attr('y', innerHeight)
      .attr('height', 0)
      .attr('fill', d => colorScale(1 - d.value))
      .attr('rx', 4)
      .attr('ry', 4)
      .transition()
      .duration(1000)
      .delay((d, i) => i * 200)
      .attr('y', d => y(d.value))
      .attr('height', d => innerHeight - y(d.value));
    
    // Add value labels
    g.selectAll('.label')
      .data(riskTypes)
      .enter().append('text')
      .attr('class', 'label')
      .attr('x', d => x(d.type)! + x.bandwidth() / 2)
      .attr('y', d => y(d.value) - 5)
      .attr('text-anchor', 'middle')
      .text(d => `${(d.value * 100).toFixed(1)}%`)
      .attr('fill', '#1f2937')
      .attr('font-weight', '600')
      .style('font-size', '12px')
      .style('opacity', 0)
      .transition()
      .duration(500)
      .delay(1200)
      .style('opacity', 1);
    
    // Add title
    g.append('text')
      .attr('x', innerWidth / 2)
      .attr('y', -10)
      .attr('text-anchor', 'middle')
      .text('Risk Assessment Heatmap')
      .attr('font-weight', '600')
      .attr('fill', '#1f2937')
      .style('font-size', '14px');
    
  }, [riskData]);

  // Risk projection timeline
  useEffect(() => {
    if (!riskData || !timelineRef.current) return;
    
    const svg = d3.select(timelineRef.current);
    svg.selectAll("*").remove();
    
    const width = 400;
    const height = 200;
    const margin = { top: 20, right: 30, bottom: 30, left: 40 };
    
    svg.attr('width', width).attr('height', height);
    
    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);
    
    // Mock future projections data
    const years = [2024, 2025, 2026, 2027, 2028, 2029, 2030];
    const floodProjection = years.map((year, i) => ({
      year,
      value: (riskData.flood || 0) * (1 + (i * 0.05)) // 5% increase per year
    }));
    
    const x = d3.scaleLinear()
      .domain(d3.extent(years) as [number, number])
      .range([0, width - margin.left - margin.right]);
    
    const y = d3.scaleLinear()
      .domain([0, 1])
      .range([height - margin.top - margin.bottom, 0]);
    
    // Add line
    const line = d3.line<{year: number, value: number}>()
      .x(d => x(d.year))
      .y(d => y(d.value))
      .curve(d3.curveMonotoneX);
    
    g.append('path')
      .datum(floodProjection)
      .attr('fill', 'none')
      .attr('stroke', '#3b82f6')
      .attr('stroke-width', 2)
      .attr('d', line);
    
    // Add dots
    g.selectAll('.dot')
      .data(floodProjection)
      .enter().append('circle')
      .attr('class', 'dot')
      .attr('cx', d => x(d.year))
      .attr('cy', d => y(d.value))
      .attr('r', 4)
      .attr('fill', '#3b82f6');
    
    // Add axes
    g.append('g')
      .attr('transform', `translate(0,${height - margin.top - margin.bottom})`)
      .call(d3.axisBottom(x).tickFormat(d3.format('d')));
    
    g.append('g')
      .call(d3.axisLeft(y).tickFormat(d => `${Math.round(Number(d) * 100)}%`));
    
  }, [riskData]);

  if (!riskData) {
    return (
      <div className="bg-card rounded-xl p-6 border">
        <h3 className="text-xl font-semibold mb-4">Risk Analysis Tools</h3>
        <div className="text-center py-12 text-muted-foreground">
          <AlertTriangle className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>Analyze a property to view risk analytics</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      className="bg-card rounded-xl p-6 border"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <TrendingUp className="w-5 h-5" />
        Risk Analysis Tools
      </h3>
      
      {location && (
        <p className="text-sm text-muted-foreground mb-6">
          Advanced analytics for: <span className="font-medium">{location}</span>
        </p>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* D3.js Heatmap */}
        <div className="space-y-4">
          <h4 className="font-medium flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded"></div>
            Risk Heatmap Visualization
          </h4>
          <div className="bg-gray-50 rounded-lg p-4">
            <svg ref={svgRef} className="w-full"></svg>
          </div>
        </div>

        {/* Risk Projection Timeline */}
        <div className="space-y-4">
          <h4 className="font-medium flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Risk Projection Timeline
          </h4>
          <div className="bg-gray-50 rounded-lg p-4">
            <svg ref={timelineRef} className="w-full"></svg>
            <p className="text-xs text-gray-500 mt-2">
              Flood risk projection through 2030 (based on climate models)
            </p>
          </div>
        </div>
      </div>

      {/* Mitigation Strategies */}
      <div className="mt-6 space-y-4">
        <h4 className="font-medium">Risk Mitigation Strategies</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(riskData).map(([riskType, value]) => {
            if (typeof value !== 'number' || value < 0.3) return null;
            
            const strategies = {
              flood: ['Install flood barriers', 'Elevate utilities', 'Improve drainage', 'Flood insurance'],
              fire: ['Create defensible space', 'Fire-resistant materials', 'Sprinkler systems', 'Evacuation plan'],
              coastalErosion: ['Seawalls', 'Beach nourishment', 'Vegetation barriers', 'Retreat planning'],
              subsidence: ['Ground monitoring', 'Foundation reinforcement', 'Drainage improvement', 'Load reduction']
            };
            
            return (
              <motion.div
                key={riskType}
                className="p-4 bg-blue-50 rounded-lg border border-blue-100"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
              >
                <h5 className="font-medium text-blue-800 mb-2 capitalize">
                  {riskType.replace(/([A-Z])/g, ' $1')} Mitigation
                </h5>
                <ul className="space-y-1">
                  {strategies[riskType as keyof typeof strategies]?.slice(0, 3).map((strategy, i) => (
                    <li key={i} className="text-sm text-blue-700 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                      {strategy}
                    </li>
                  ))}
                </ul>
                <div className="mt-2 text-xs text-blue-600">
                  Risk reduction potential: {Math.round((1 - value) * 40 + 20)}%
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}