import React, { useState } from 'react';
import {
  Video,
  Mic,
  MicOff,
  VideoOff,
  PhoneOff,
  MessageSquare,
  FileText,
  Send,
  User,
  Activity,
  CheckCircle,
  Share2,
  Stethoscope
} from 'lucide-react';
import { PatientHealthRecord } from '../../data/mockCitizens';

interface TeleconsultationRoomProps {
  patient: PatientHealthRecord;
  doctorName?: string;
  workerName?: string;
  onEndCall?: () => void;
}

export const TeleconsultationRoom: React.FC<TeleconsultationRoomProps> = ({
  patient,
  doctorName = 'Dr. Ananya Patil (MD Medicine)',
  workerName = 'Sunita Tai Gaikwad (ASHA Worker)',
  onEndCall,
}) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [activeTab, setActiveTab] = useState<'notes' | 'chat' | 'history'>('notes');
  const [chatMessages, setChatMessages] = useState<{ sender: string; text: string; time: string }[]>([
    { sender: 'Health Worker (ASHA)', text: 'Namaskar Doctor Madam. Patient Ramesh Jadhav is present at Sub-Centre Anjaneri. BP is 136/86, Fasting Sugar 134 mg/dL.', time: '10:31 AM' },
    { sender: 'Dr. Ananya Patil', text: 'Namaskar Sunita Tai. Good morning Ramesh ji. How has the foot numbness been over the last fortnight?', time: '10:32 AM' }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [rxNotes, setRxNotes] = useState('Advised continuing Tab. Metformin 500mg BD. Added Vit B12/Alpha Lipoic Acid for peripheral neuropathy. Prescribed fasting lipid profile and HbA1c repeat in 3 months.');
  const [callStatus, setCallStatus] = useState<'Active' | 'Concluded'>('Active');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    setChatMessages(prev => [
      ...prev,
      {
        sender: 'You',
        text: newMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    setNewMessage('');
  };

  const handleConcludeConsultation = () => {
    setCallStatus('Concluded');
    alert('e-Sanjeevani Teleconsultation concluded successfully! Digital e-Prescription registered on ABDM health repository.');
    if (onEndCall) onEndCall();
  };

  return (
    <div className="bg-white border border-gov-gray-300 rounded-lg shadow-sm overflow-hidden flex flex-col h-[750px]">
      {/* Teleconsultation Top Header */}
      <div className="bg-gov-navy text-white px-4 py-2.5 flex flex-wrap items-center justify-between gap-2 border-b border-gov-navyDark">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
          <span className="font-bold text-xs uppercase tracking-wider">
            National Teleconsultation Service (e-Sanjeevani Model)
          </span>
          <span className="bg-gov-saffron text-white text-[10px] font-semibold px-2 py-0.5 rounded">
            Session: #ESANJ-2026-9182
          </span>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <span className="text-slate-300">Encrypted HD Audio-Video Link</span>
          <span className="bg-emerald-600 px-2 py-0.5 rounded text-[11px] font-semibold">
            {callStatus}
          </span>
        </div>
      </div>

      {/* Main Split Layout: Video Grid (Left) + Clinical Drawer (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 flex-1 overflow-hidden">
        
        {/* Left: 3-Party Video Conference Simulation (2 Cols) */}
        <div className="lg:col-span-2 bg-slate-900 p-3 flex flex-col justify-between">
          
          {/* Video Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 flex-1">
            
            {/* Window 1: Remote Specialist Doctor */}
            <div className="bg-slate-800 border border-slate-700 rounded-lg relative overflow-hidden flex flex-col items-center justify-center text-white min-h-[200px]">
              <div className="w-20 h-20 rounded-full bg-slate-700 border-2 border-gov-saffron flex items-center justify-center text-slate-300">
                <Stethoscope className="w-10 h-10 text-gov-saffron" />
              </div>
              <div className="absolute bottom-2 left-2 bg-slate-900/80 px-2.5 py-1 rounded text-xs border border-slate-700 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="font-bold text-white">{doctorName}</span>
                <span className="text-[10px] text-slate-400">(Civil Hospital Nashik)</span>
              </div>
            </div>

            {/* Window 2: Rural Patient + Community Health Worker at Sub-Centre */}
            <div className="bg-slate-800 border border-slate-700 rounded-lg relative overflow-hidden flex flex-col items-center justify-center text-white min-h-[200px]">
              <div className="w-20 h-20 rounded-full bg-slate-700 border-2 border-emerald-400 flex items-center justify-center text-slate-300">
                <User className="w-10 h-10 text-emerald-400" />
              </div>
              <div className="absolute bottom-2 left-2 bg-slate-900/80 px-2.5 py-1 rounded text-xs border border-slate-700 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="font-bold text-white">{patient.name}</span>
                <span className="text-[10px] text-emerald-300">+ {workerName}</span>
              </div>
              <div className="absolute top-2 right-2 bg-slate-900/70 text-[10px] text-slate-300 px-2 py-0.5 rounded">
                Sub-Centre Anjaneri Node
              </div>
            </div>

            {/* Window 3: Live Clinical Telemetry Feed */}
            <div className="sm:col-span-2 bg-slate-950 border border-slate-800 rounded-lg p-3 text-slate-200">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-400 border-b border-slate-800 pb-1.5 mb-2">
                <span className="flex items-center gap-1 text-emerald-400">
                  <Activity className="w-4 h-4" />
                  Live Digital Diagnostic Telemetry from Field Tablet
                </span>
                <span>ABHA ID: {patient.abhaId}</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
                <div className="bg-slate-900 p-2 rounded border border-slate-800">
                  <div className="text-[10px] text-slate-400">Blood Pressure</div>
                  <div className="text-base font-extrabold text-white mt-0.5">{patient.vitals.bp}</div>
                  <div className="text-[9px] text-amber-400">Stage 1 HTN</div>
                </div>
                <div className="bg-slate-900 p-2 rounded border border-slate-800">
                  <div className="text-[10px] text-slate-400">Heart Pulse</div>
                  <div className="text-base font-extrabold text-emerald-400 mt-0.5">{patient.vitals.pulse}</div>
                  <div className="text-[9px] text-slate-400">Sinus rhythm</div>
                </div>
                <div className="bg-slate-900 p-2 rounded border border-slate-800">
                  <div className="text-[10px] text-slate-400">Blood Oxygen</div>
                  <div className="text-base font-extrabold text-sky-400 mt-0.5">{patient.vitals.spo2}</div>
                  <div className="text-[9px] text-slate-400">Adequate</div>
                </div>
                <div className="bg-slate-900 p-2 rounded border border-slate-800">
                  <div className="text-[10px] text-slate-400">Fasting Glucose</div>
                  <div className="text-base font-extrabold text-amber-400 mt-0.5">{patient.vitals.bloodSugarFasting}</div>
                  <div className="text-[9px] text-amber-400">Moderately elevated</div>
                </div>
              </div>
            </div>

          </div>

          {/* Video Conference Controls Strip */}
          <div className="mt-3 pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className={`p-2.5 rounded-full border transition-colors ${
                  isMuted ? 'bg-rose-600 text-white border-rose-500' : 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700'
                }`}
                title={isMuted ? 'Unmute microphone' : 'Mute microphone'}
              >
                {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>

              <button
                onClick={() => setIsVideoOff(!isVideoOff)}
                className={`p-2.5 rounded-full border transition-colors ${
                  isVideoOff ? 'bg-rose-600 text-white border-rose-500' : 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700'
                }`}
                title={isVideoOff ? 'Turn video on' : 'Turn video off'}
              >
                {isVideoOff ? <VideoOff className="w-4 h-4" /> : <Video className="w-4 h-4" />}
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleConcludeConsultation}
                className="flex items-center gap-1.5 bg-gov-emergency hover:bg-rose-800 text-white px-4 py-2 rounded-full font-bold text-xs transition-colors shadow-sm"
              >
                <PhoneOff className="w-4 h-4" />
                <span>Conclude Tele-OPD</span>
              </button>
            </div>
          </div>

        </div>

        {/* Right: Clinical Drawer (Consultation Notes, Live Chat, Medical History) */}
        <div className="bg-slate-50 border-t lg:border-t-0 lg:border-l border-gov-gray-200 flex flex-col h-full">
          
          {/* Tab Switcher */}
          <div className="flex border-b border-gov-gray-200 bg-white text-xs font-semibold">
            <button
              onClick={() => setActiveTab('notes')}
              className={`flex-1 py-2.5 text-center border-b-2 transition-colors flex items-center justify-center gap-1 ${
                activeTab === 'notes' ? 'border-gov-navy text-gov-navy bg-slate-50' : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Rx Notes</span>
            </button>
            <button
              onClick={() => setActiveTab('chat')}
              className={`flex-1 py-2.5 text-center border-b-2 transition-colors flex items-center justify-center gap-1 ${
                activeTab === 'chat' ? 'border-gov-navy text-gov-navy bg-slate-50' : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Chat ({chatMessages.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`flex-1 py-2.5 text-center border-b-2 transition-colors flex items-center justify-center gap-1 ${
                activeTab === 'history' ? 'border-gov-navy text-gov-navy bg-slate-50' : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              <span>EHR History</span>
            </button>
          </div>

          {/* Tab 1: Prescription & Notes Pad */}
          {activeTab === 'notes' && (
            <div className="p-4 flex-1 flex flex-col justify-between overflow-y-auto text-xs space-y-3">
              <div>
                <div className="font-bold text-gov-navy uppercase tracking-wider text-[11px] mb-1">
                  Doctor's Electronic Clinical Notes & Rx Pad
                </div>
                <textarea
                  value={rxNotes}
                  onChange={(e) => setRxNotes(e.target.value)}
                  rows={8}
                  aria-label="Clinical Consultation Notes & e-Prescription"
                  className="w-full p-2.5 border border-gov-gray-300 rounded font-sans text-xs focus:ring-1 focus:ring-gov-navy focus:outline-none bg-white leading-relaxed"
                />
              </div>

              <div className="bg-white p-3 rounded border border-gov-gray-200 space-y-1.5">
                <div className="font-bold text-gov-navy text-[11px] uppercase">Drug Refill Dispensing:</div>
                <div className="text-[11px] text-slate-600">
                  ✓ Tab. Metformin 500mg (30 Tablets) — Available at PHC Trimbak Pharmacy
                </div>
                <div className="text-[11px] text-slate-600">
                  ✓ Tab. Amlodipine 5mg (30 Tablets) — Available at PHC Trimbak Pharmacy
                </div>
              </div>

              <button
                onClick={handleConcludeConsultation}
                className="w-full py-2.5 bg-gov-navy text-white rounded font-bold text-xs hover:bg-gov-navyLight transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>Issue e-Prescription & Notify Patient</span>
              </button>
            </div>
          )}

          {/* Tab 2: Real-Time Chat */}
          {activeTab === 'chat' && (
            <div className="flex-1 flex flex-col justify-between overflow-hidden">
              <div className="p-3 overflow-y-auto space-y-2 flex-1 text-xs">
                {chatMessages.map((msg, i) => (
                  <div
                    key={i}
                    className={`p-2 rounded max-w-[85%] ${
                      msg.sender === 'You'
                        ? 'ml-auto bg-blue-100 text-blue-900'
                        : 'bg-white border border-slate-200 text-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] text-slate-500 mb-0.5">
                      <span className="font-semibold">{msg.sender}</span>
                      <span>{msg.time}</span>
                    </div>
                    <p>{msg.text}</p>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSendMessage} className="p-2 border-t border-slate-200 bg-white flex gap-1.5">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type message to doctor or health worker..."
                  className="flex-1 px-3 py-1.5 text-xs border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-gov-navy"
                />
                <button
                  type="submit"
                  className="bg-gov-navy text-white px-3 py-1.5 rounded hover:bg-gov-navyLight"
                  aria-label="Send message"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          )}

          {/* Tab 3: EHR Summary */}
          {activeTab === 'history' && (
            <div className="p-3 overflow-y-auto space-y-3 text-xs flex-1">
              <div className="bg-white p-3 rounded border border-slate-200">
                <div className="font-bold text-gov-navy text-[11px] uppercase mb-1">Known Allergies</div>
                <div className="flex flex-wrap gap-1">
                  {patient.allergies.map(a => (
                    <span key={a} className="bg-rose-100 text-rose-800 font-semibold px-2 py-0.5 rounded text-[10px]">
                      {a}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-white p-3 rounded border border-slate-200">
                <div className="font-bold text-gov-navy text-[11px] uppercase mb-1">Chronic Conditions</div>
                <ul className="list-disc list-inside text-slate-700 space-y-0.5 text-[11px]">
                  {patient.chronicConditions.map(c => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-white p-3 rounded border border-slate-200">
                <div className="font-bold text-gov-navy text-[11px] uppercase mb-1">Latest Lab Report (14 Sep)</div>
                <div className="text-slate-600 text-[11px] space-y-0.5">
                  <div>HbA1c: <strong className="text-amber-700">7.4%</strong> (Target &lt; 7.0%)</div>
                  <div>Haemoglobin: 13.8 g/dL (Normal)</div>
                  <div>Platelets: 2.4 Lakhs/cumm</div>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
