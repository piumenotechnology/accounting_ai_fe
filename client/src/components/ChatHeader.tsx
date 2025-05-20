interface ChatHeaderProps {
  configOpen: boolean;
  setConfigOpen: (open: boolean) => void;
}

const ChatHeader = ({ configOpen, setConfigOpen }: ChatHeaderProps) => {
  return (
    <header className="bg-gradient-to-r from-blue-600 via-indigo-700 to-purple-800 shadow-xl p-6 text-white relative overflow-hidden">
      {/* Abstract background patterns */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-8 left-12 w-24 h-24 rounded-full bg-white"></div>
        <div className="absolute bottom-5 right-24 w-16 h-16 rounded-full bg-yellow-300"></div>
        <div className="absolute top-12 right-32 w-10 h-10 rounded-full bg-pink-400"></div>
      </div>
      
      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center space-x-5">
          <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-indigo-300">
            <i className="fas fa-robot text-indigo-600 text-xl"></i>
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Financial Insights AI</h1>
            <div className="flex items-center mt-1">
              <div className="w-2 h-2 rounded-full bg-green-400 mr-2 animate-pulse"></div>
              <span className="text-sm text-blue-100">Your intelligent accounting assistant</span>
            </div>
          </div>
        </div>
        <div>
          <button 
            onClick={() => setConfigOpen(!configOpen)}
            className={`${
              configOpen 
                ? 'bg-white text-indigo-700 border-white' 
                : 'bg-indigo-700 bg-opacity-40 backdrop-blur-sm text-white hover:bg-indigo-800 border-indigo-500'
            } px-5 py-2.5 rounded-full shadow-md text-sm font-medium flex items-center transition-all 
            border hover:shadow-lg`}
          >
            <i className={`fas ${configOpen ? 'fa-times' : 'fa-cog'} mr-2`}></i> 
            {configOpen ? 'Close Settings' : 'Data Settings'}
          </button>
        </div>
      </div>
    </header>
  );
};

export default ChatHeader;