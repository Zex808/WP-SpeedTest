import React, { useState } from 'react';

interface InputFormProps {
  onSubmit: (url: string, hosting: string, details: string) => void;
  isLoading: boolean;
}

const InputForm: React.FC<InputFormProps> = ({ onSubmit, isLoading }) => {
  const [url, setUrl] = useState('');
  const [hosting, setHosting] = useState('');
  const [details, setDetails] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(url, hosting, details);
  };

  const inputClasses = "w-full px-4 py-3 bg-gray-900 text-white font-semibold text-[16px] border border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition placeholder:text-gray-500 font-['Poppins']";

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 border border-gray-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-red-100 p-2 rounded-lg text-red-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-800">A speed test is like Russian Roulette</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">WordPress Site URL</label>
          <input
            type="url"
            id="url"
            required
            className={inputClasses}
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
            <label htmlFor="hosting" className="block text-sm font-medium text-gray-700 mb-1">Hosting Provider</label>
            <input
                type="text"
                id="hosting"
                className={inputClasses}
                placeholder="e.g., SiteGround, AWS..."
                value={hosting}
                onChange={(e) => setHosting(e.target.value)}
            />
            </div>
            <div className="flex items-center pt-6">
                 <div className="text-sm text-gray-500 bg-gray-50 px-3 py-2 rounded-md w-full border border-gray-200">
                    <span className="font-semibold text-gray-700">Context:</span> Elementor Optimized
                 </div>
            </div>
        </div>

        <div>
          <label htmlFor="details" className="block text-sm font-medium text-gray-700 mb-1">
            Current Issues or Active Plugins (Optional)
          </label>
          <textarea
            id="details"
            rows={3}
            className={inputClasses}
            placeholder="e.g., Slow mobile load, already using WP Rocket..."
            value={details}
            onChange={(e) => setDetails(e.target.value)}
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-4 px-6 text-white font-bold rounded-lg shadow-md transition-all duration-200 flex items-center justify-center gap-3 text-lg
            ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary hover:bg-indigo-700 active:scale-[0.99]'}
          `}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Running Proprietary Audit...
            </>
          ) : (
            <>
              GPO Plus+ Proprietary Audit
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default InputForm;