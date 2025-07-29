
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from '@/components/ui/card';
import { Search, MapPin, Globe } from 'lucide-react';
import { Input } from '@/components/ui/input';
import Layout from '@/components/layout/Layout';

// Location data
const indiaLocations = [
  { id: 'north', name: 'North India', states: ['Delhi NCR', 'Punjab', 'Haryana', 'Uttar Pradesh', 'Uttarakhand'] },
  { id: 'south', name: 'South India', states: ['Tamil Nadu', 'Karnataka', 'Kerala', 'Andhra Pradesh', 'Telangana'] },
  { id: 'east', name: 'East India', states: ['West Bengal', 'Odisha', 'Bihar', 'Jharkhand'] },
  { id: 'west', name: 'West India', states: ['Maharashtra', 'Gujarat', 'Rajasthan', 'Goa'] },
  { id: 'central', name: 'Central India', states: ['Madhya Pradesh', 'Chhattisgarh'] }
];

const abroadLocations = [
  { id: 'na', name: 'North America', countries: ['USA', 'Canada'] },
  { id: 'eu', name: 'Europe', countries: ['UK', 'Germany', 'France', 'Italy', 'Spain', 'Netherlands'] },
  { id: 'asia', name: 'Asia', countries: ['Singapore', 'Hong Kong', 'Japan', 'South Korea', 'China'] },
  { id: 'au', name: 'Australia & New Zealand', countries: ['Australia', 'New Zealand'] },
  { id: 'me', name: 'Middle East', countries: ['UAE', 'Qatar', 'Saudi Arabia'] }
];

const LocationSelection = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { careerField, specialization } = location.state || {};

  const [activeTab, setActiveTab] = useState('india');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  // Filter locations based on search term
  const filteredIndiaLocations = searchTerm
    ? indiaLocations.filter(
        region => 
          region.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          region.states.some(state => state.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : indiaLocations;

  const filteredAbroadLocations = searchTerm
    ? abroadLocations.filter(
        region => 
          region.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          region.countries.some(country => country.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : abroadLocations;

  // Handle region selection
  const handleRegionSelect = (regionId: string) => {
    setSelectedRegion(regionId);
    setSelectedLocation(null);
  };

  // Handle location selection
  const handleLocationSelect = (locationName: string) => {
    setSelectedLocation(locationName);
  };

  // Handle continue button click
  const handleContinue = () => {
    if (selectedLocation) {
      navigate('/colleges', {
        state: {
          careerField,
          specialization,
          locationType: activeTab,
          region: selectedRegion,
          location: selectedLocation
        }
      });
    }
  };

  return (
    <Layout>
      <div className="bg-gray-50 py-12 min-h-[80vh]">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h1 className="campus-heading text-center">Where Would You Like to Study?</h1>
            <p className="text-lg text-gray-600 text-center mb-8">
              Select a location to find colleges and universities that match your preferences
            </p>

            {/* Career Selection Summary */}
            {careerField && specialization && (
              <div className="bg-campus-50 border border-campus-200 rounded-lg p-4 mb-8">
                <p className="text-gray-600">
                  Selected Career Path: <span className="font-semibold">{specialization}</span> in <span className="font-semibold">{careerField}</span>
                </p>
              </div>
            )}

            {/* Location Tabs */}
            <Tabs defaultValue="india" value={activeTab} onValueChange={setActiveTab} className="mb-6">
              <TabsList className="grid grid-cols-2 w-[300px] mx-auto">
                <TabsTrigger value="india" className="flex items-center">
                  <MapPin className="mr-1 h-4 w-4" /> India
                </TabsTrigger>
                <TabsTrigger value="abroad" className="flex items-center">
                  <Globe className="mr-1 h-4 w-4" /> Abroad
                </TabsTrigger>
              </TabsList>

              {/* Search */}
              <div className="relative mb-8 max-w-md mx-auto mt-6">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder={`Search ${activeTab === 'india' ? 'states' : 'countries'}...`}
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Regions */}
              <TabsContent value="india" className="mt-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                  {filteredIndiaLocations.map((region) => (
                    <Card 
                      key={region.id} 
                      className={`cursor-pointer transition-all hover:shadow-md ${
                        selectedRegion === region.id 
                          ? 'ring-2 ring-campus-700 shadow-md' 
                          : 'hover:border-campus-200'
                      }`}
                      onClick={() => handleRegionSelect(region.id)}
                    >
                      <CardContent className="p-6">
                        <h3 className="font-semibold text-lg mb-3">{region.name}</h3>
                        <p className="text-sm text-gray-600">
                          {region.states.slice(0, 3).join(', ')}
                          {region.states.length > 3 ? `, +${region.states.length - 3} more` : ''}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                {/* Specific Locations */}
                {selectedRegion && (
                  <div className="mt-8">
                    <h2 className="text-xl font-semibold text-campus-700 mb-4">
                      Select a State in {indiaLocations.find(r => r.id === selectedRegion)?.name}
                    </h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                      {indiaLocations
                        .find(r => r.id === selectedRegion)
                        ?.states.map((state, index) => (
                          <div
                            key={index}
                            className={`p-3 border rounded-md text-center cursor-pointer transition-all ${
                              selectedLocation === state
                                ? 'bg-campus-700 text-white border-campus-800'
                                : 'bg-white hover:bg-gray-50 border-gray-200'
                            }`}
                            onClick={() => handleLocationSelect(state)}
                          >
                            {state}
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="abroad" className="mt-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                  {filteredAbroadLocations.map((region) => (
                    <Card 
                      key={region.id} 
                      className={`cursor-pointer transition-all hover:shadow-md ${
                        selectedRegion === region.id 
                          ? 'ring-2 ring-campus-700 shadow-md' 
                          : 'hover:border-campus-200'
                      }`}
                      onClick={() => handleRegionSelect(region.id)}
                    >
                      <CardContent className="p-6">
                        <h3 className="font-semibold text-lg mb-3">{region.name}</h3>
                        <p className="text-sm text-gray-600">
                          {region.countries.slice(0, 3).join(', ')}
                          {region.countries.length > 3 ? `, +${region.countries.length - 3} more` : ''}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                {/* Specific Locations */}
                {selectedRegion && (
                  <div className="mt-8">
                    <h2 className="text-xl font-semibold text-campus-700 mb-4">
                      Select a Country in {abroadLocations.find(r => r.id === selectedRegion)?.name}
                    </h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                      {abroadLocations
                        .find(r => r.id === selectedRegion)
                        ?.countries.map((country, index) => (
                          <div
                            key={index}
                            className={`p-3 border rounded-md text-center cursor-pointer transition-all ${
                              selectedLocation === country
                                ? 'bg-campus-700 text-white border-campus-800'
                                : 'bg-white hover:bg-gray-50 border-gray-200'
                            }`}
                            onClick={() => handleLocationSelect(country)}
                          >
                            {country}
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </TabsContent>
            </Tabs>

            {selectedLocation && (
              <div className="mt-8 flex justify-center">
                <Button 
                  className="bg-campus-700 hover:bg-campus-800" 
                  size="lg" 
                  onClick={handleContinue}
                >
                  Find Colleges in {selectedLocation}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LocationSelection;
