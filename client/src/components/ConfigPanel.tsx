interface ConfigPanelProps {
  sessionId: string;
  table: string;
  tableOptions: string[];
  setTable: (table: string) => void;
}

const ConfigPanel = ({ sessionId, table, tableOptions, setTable }: ConfigPanelProps) => {
  return (
    <div className="bg-gradient-to-b from-indigo-50 to-white p-8 border-b border-indigo-100 shadow-sm relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full blur-2xl opacity-40 -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-indigo-100 to-blue-100 rounded-full blur-xl opacity-30 translate-y-1/2 -translate-x-1/2"></div>
      
      <div className="relative">
        <div className="flex items-center mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-700 flex items-center justify-center shadow-md mr-3">
            <i className="fas fa-database text-white"></i>
          </div>
          <h2 className="text-lg font-bold text-gray-800">Financial Data Settings</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-5 rounded-xl shadow-sm border border-indigo-50 hover:shadow-md transition-shadow">
            <label htmlFor="session_id" className="block text-sm font-bold text-gray-700 mb-3">
              <i className="fas fa-key text-indigo-500 mr-2"></i> Session ID
            </label>
            <input
              type="text"
              id="session_id"
              value={sessionId}
              disabled
              className="w-full p-3 text-sm border border-gray-200 rounded-lg bg-gray-50 cursor-not-allowed font-mono"
            />
            <p className="mt-3 text-xs text-gray-500 flex items-start">
              <i className="fas fa-info-circle text-indigo-400 mr-2 mt-0.5"></i>
              <span>This unique identifier tracks your conversation history across sessions</span>
            </p>
          </div>
          
          <div className="bg-white p-5 rounded-xl shadow-sm border border-indigo-50 hover:shadow-md transition-shadow">
            <label htmlFor="table" className="block text-sm font-bold text-gray-700 mb-3">
              <i className="fas fa-table text-indigo-500 mr-2"></i> Data Category
            </label>
            <div className="relative">
              <select
                id="table"
                value={table}
                onChange={(e) => setTable(e.target.value)}
                className="w-full p-3 text-sm border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white appearance-none pr-10"
              >
                {tableOptions.map((option) => (
                  <option key={option} value={option}>
                    {option === "AR" ? "Accounts Receivable (AR)" : 
                     option === "AP" ? "Accounts Payable (AP)" : 
                     option === "ClosedDeal" ? "Closed Deals" : 
                     option === "Payment" ? "Payments" : 
                     option === "Invoice" ? "Invoices" : option}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <i className="fas fa-chevron-down text-indigo-500"></i>
              </div>
            </div>
            <p className="mt-3 text-xs text-gray-500 flex items-start">
              <i className="fas fa-lightbulb text-indigo-400 mr-2 mt-0.5"></i>
              <span>Choose the financial data category you want to analyze</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfigPanel;