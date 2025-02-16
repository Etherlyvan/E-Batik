"use client"

import React, { useEffect, useState } from 'react';
import { Language, Tema } from './types';
import { TextInput } from './components/TextInput';
import { TextArea } from './components/TextArea';
import { ImageUpload } from './components/ImageUpload';
import { TemaSection } from './components/TemaSection';
import { useFormSubmission } from './hooks/useFormSubmission';
import UploadAlert from './components/UploadAlert';

export const BatikForm: React.FC = () => {
  const [languages, setLanguages] = useState<Language[]>([]);
  const [temas, setTemas] = useState<Tema[]>([]);
  const [activeLanguage, setActiveLanguage] = useState<number | null>(null);
  
  const {
    formData,
    loading,
    error,
    success,
    images,
    uploading,
    handleInputChange,
    handleTranslationChange,
    handleTemaChange,
    handleSubTemaChange,
    handleFileChange,
    removeImage,
    submitForm,
    alert,     
    hideAlert  
  } = useFormSubmission();

  // Fetch languages and temas
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch languages
        const langResponse = await fetch('/api/languages');
        if (langResponse.ok) {
          const langData: Language[] = await langResponse.json();
          setLanguages(langData);
          
          // Set default language as active
          const defaultLang = langData.find(l => l.isDefault);
          if (defaultLang) {
            setActiveLanguage(defaultLang.id);
          } else if (langData.length > 0) {
            setActiveLanguage(langData[0].id);
          }
        }
        
        // Fetch temas with subtemas
        const temaResponse = await fetch('/api/temas');
        if (temaResponse.ok) {
          const temaData: Tema[] = await temaResponse.json();
          setTemas(temaData);
        }
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };
    
    fetchData();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Form Tambah Batik</h1>
      
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
          Data batik berhasil disimpan!
        </div>
      )}
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          submitForm();
        }}
        className="space-y-8"
      >
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Informasi Umum</h2>
          
          <TextInput
            id="nama"
            name="nama"
            label="Nama Batik"
            value={formData.nama}
            onChange={handleInputChange}
            required
          />
          
          <TextInput
            id="kode"
            name="kode"
            label="Kode Batik (opsional)"
            value={formData.kode ?? ''}
            onChange={handleInputChange}
          />       
          <TextInput
            id="alamat"
            name="alamat"
            label="alamat seniman (opsional)"
            value={formData.alamat ?? ''}
            onChange={handleInputChange}
          />          
          <TextInput
            id="seniman"
            name="seniman"
            label="seniman Batik (opsional)"
            value={formData.seniman ?? ''}
            onChange={handleInputChange}
          />         

          <TextInput
            id="pointmap"
            name="pointmap"
            label="Link Gmaps (opsional)"
            value={formData.pointmap ?? ''}
            onChange={handleInputChange}
          />

          <TextInput
            id="tahun"
            name="tahun"
            label="Tahun"
            value={formData.tahun}
            onChange={handleInputChange}
            required
          />
          
          <TextInput
            id="dimensi"
            name="dimensi"
            label="Dimensi"
            value={formData.dimensi}
            onChange={handleInputChange}
            placeholder="contoh: 100cm x 200cm"
            required
          />

          <div className="mt-6">
            <h3 className="text-lg font-medium mb-3">Foto Batik</h3>
            <ImageUpload
              images={images}
              onFileChange={handleFileChange}
              onRemove={removeImage}
              uploading={uploading}  // Add this
            error={error}         // Add this if you have error state


            />
            <UploadAlert
                show={alert.show}
                type={alert.type}
                message={alert.message}
                onClose={hideAlert}
            />

          </div>
        </div>

        {languages.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Informasi Dalam Berbagai Bahasa</h2>
            
            <div className="mb-4">
              <div className="flex space-x-2 border-b pb-2">
                {languages.map(lang => (
                  <button
                    key={lang.id}
                    type="button"
                    onClick={() => setActiveLanguage(lang.id)}
                    className={`px-3 py-1 rounded ${
                      activeLanguage === lang.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 hover:bg-gray-300'
                    }`}
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
            </div>
            
            {activeLanguage && (
              <div className="space-y-4">
                <TextInput
                  id={`warna-${activeLanguage}`}
                  name={`warna-${activeLanguage}`}
                  label="Warna"
                  value={formData.translations[activeLanguage]?.warna ?? ''}
                  onChange={(e) => handleTranslationChange(activeLanguage, 'warna', e.target.value)}
                  required
                />
                
                <TextInput
                  id={`teknik-${activeLanguage}`}
                  name={`teknik-${activeLanguage}`}
                  label="Teknik"
                  value={formData.translations[activeLanguage]?.teknik ?? ''}
                  onChange={(e) => handleTranslationChange(activeLanguage, 'teknik', e.target.value)}
                  required
                />
                
                <TextInput
                  id={`jenisKain-${activeLanguage}`}
                  name={`jenisKain-${activeLanguage}`}
                  label="Jenis Kain"
                  value={formData.translations[activeLanguage]?.jenisKain ?? ''}
                  onChange={(e) => handleTranslationChange(activeLanguage, 'jenisKain', e.target.value)}
                  required
                />
                
                <TextInput
                  id={`pewarna-${activeLanguage}`}
                  name={`pewarna-${activeLanguage}`}
                  label="Pewarna"
                  value={formData.translations[activeLanguage]?.pewarna ?? ''}
                  onChange={(e) => handleTranslationChange(activeLanguage, 'pewarna', e.target.value)}
                  required
                />
                
                <TextInput
                  id={`bentuk-${activeLanguage}`}
                  name={`bentuk-${activeLanguage}`}
                  label="Bentuk"
                  value={formData.translations[activeLanguage]?.bentuk ?? ''}
                  onChange={(e) => handleTranslationChange(activeLanguage, 'bentuk', e.target.value)}
                  required
                />
                
                <TextArea
                  id={`histori-${activeLanguage}`}
                  name={`histori-${activeLanguage}`}
                  label="Histori"
                  value={formData.translations[activeLanguage]?.histori ?? ''}
                  onChange={(e) => handleTranslationChange(activeLanguage, 'histori', e.target.value)}
                  rows={6}
                  required
                />
              </div>
            )}
          </div>
        )}
        
        {temas.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <TemaSection
              temas={temas}
              selectedTemaIds={formData.temaIds}
              selectedSubTemaIds={formData.subTemaIds}
              onTemaChange={handleTemaChange}
              onSubTemaChange={handleSubTemaChange}
            />
          </div>
        )}
        
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => window.location.href = '/admin/batik'}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            Batal
          </button>
          <button
            type="submit"
            disabled={loading}
            className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
              loading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Menyimpan...' : 'Simpan'}
          </button>
        </div>
      </form>
    </div>
  );
};
