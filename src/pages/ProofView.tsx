
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useTranslation } from 'react-i18next';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { Check, ThumbsUp, MessageCircle, AlertTriangle, Clock, ArrowLeft } from 'lucide-react';

type ProofViewProps = {
  storeName: string;
  orderId: string;
};

const ProofView = ({ storeName, orderId }: ProofViewProps) => {
  const { t, i18n } = useTranslation();
  const { toast } = useToast();
  const [comment, setComment] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showUndo, setShowUndo] = useState(false);
  const [undoTimer, setUndoTimer] = useState(300); // 5 minutes in seconds
  const [proofStatus, setProofStatus] = useState<'waiting' | 'approved' | 'rejected' | 'sent'>('sent');
  const [currentProofIndex, setCurrentProofIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  
  // Sample proof versions for demo
  const proofVersions = [
    { id: 1, image: '/proofs/sample.jpg', date: '2025-05-10' },
    { id: 2, image: '/proofs/sample.jpg', date: '2025-05-11' }
  ];

  // Auto-detect browser language
  useEffect(() => {
    const browserLang = navigator.language.split('-')[0];
    i18n.changeLanguage(browserLang);
  }, [i18n]);

  // Handle undo timer
  useEffect(() => {
    if (showUndo && undoTimer > 0) {
      const timer = setInterval(() => {
        setUndoTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (undoTimer === 0) {
      setShowUndo(false);
      toast({
        title: t('Approval Confirmed'),
        description: t('Your proof approval has been locked in'),
      });
    }
  }, [showUndo, undoTimer, toast, t]);

  const handleApprove = () => {
    if (!termsAccepted) {
      toast({
        title: t('Action Required'),
        description: t('Please confirm that you have reviewed all details'),
        variant: "destructive",
      });
      return;
    }
    
    setProofStatus('approved');
    setShowUndo(true);
    setUndoTimer(300);
    
    toast({
      title: t('Proof Approved'),
      description: t('You can undo this action for the next 5 minutes'),
    });
  };

  const handleReject = () => {
    if (comment.trim() === '') {
      toast({
        title: t('Action Required'),
        description: t('Please provide revision details'),
        variant: "destructive",
      });
      return;
    }
    
    setProofStatus('rejected');
    
    toast({
      title: t('Changes Requested'),
      description: t('Your revision request has been submitted'),
    });
  };

  const handleUndo = () => {
    setProofStatus('sent');
    setShowUndo(false);
    setUndoTimer(300);
    
    toast({
      title: t('Approval Undone'),
      description: t('You can now make a different decision'),
    });
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handlePrevProof = () => {
    if (currentProofIndex > 0) {
      setCurrentProofIndex(currentProofIndex - 1);
    }
  };

  const handleNextProof = () => {
    if (currentProofIndex < proofVersions.length - 1) {
      setCurrentProofIndex(currentProofIndex + 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col space-y-6">
          {/* Header */}
          <header className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">{t('Proof Review')}</h1>
              <p className="text-gray-600">
                {t('Order')} #{orderId} - {storeName}
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <a href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800">
                <ArrowLeft className="w-4 h-4 mr-1" />
                {t('Return to Store')}
              </a>
            </div>
          </header>

          {/* Status Banner */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-lg ${
              proofStatus === 'approved' ? 'bg-green-100 text-green-800' :
              proofStatus === 'rejected' ? 'bg-red-100 text-red-800' :
              proofStatus === 'waiting' ? 'bg-yellow-100 text-yellow-800' :
              'bg-blue-100 text-blue-800'
            }`}
          >
            <div className="flex items-center justify-center">
              {proofStatus === 'approved' ? <ThumbsUp className="w-5 h-5 mr-2" /> :
              proofStatus === 'rejected' ? <MessageCircle className="w-5 h-5 mr-2" /> :
              proofStatus === 'waiting' ? <Clock className="w-5 h-5 mr-2" /> :
              <AlertTriangle className="w-5 h-5 mr-2" />}
              
              <p className="font-medium">
                {proofStatus === 'approved' ? t('Proof Approved') :
                proofStatus === 'rejected' ? t('Changes Requested') :
                proofStatus === 'waiting' ? t('Waiting for Proof') :
                t('Proof Sent for Review')}
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Proof Image */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>{t('Proof Preview')}</CardTitle>
                  <CardDescription>
                    {t('Version')} {currentProofIndex + 1} of {proofVersions.length} - {proofVersions[currentProofIndex].date}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <div className="relative">
                    <motion.div
                      whileHover={{ scale: isZoomed ? 1 : 1.02 }}
                      className={`cursor-pointer transition-all ${isZoomed ? 'fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4' : ''}`}
                      onClick={() => setIsZoomed(!isZoomed)}
                    >
                      <img
                        src={proofVersions[currentProofIndex].image}
                        alt="Proof"
                        className={`rounded-lg ${isZoomed ? 'max-h-screen max-w-full object-contain' : 'max-h-[500px] w-auto shadow-lg'}`}
                      />
                    </motion.div>
                  </div>
                </CardContent>
                {proofVersions.length > 1 && (
                  <CardFooter className="flex justify-between">
                    <Button 
                      variant="outline" 
                      onClick={handlePrevProof}
                      disabled={currentProofIndex === 0}
                    >
                      {t('Previous Version')}
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={handleNextProof}
                      disabled={currentProofIndex === proofVersions.length - 1}
                    >
                      {t('Next Version')}
                    </Button>
                  </CardFooter>
                )}
              </Card>
            </div>

            {/* Action Panel */}
            <div className="lg:col-span-1">
              <div className="space-y-6">
                {/* Seller Message */}
                <Card>
                  <CardHeader>
                    <CardTitle>{t('Message from Seller')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      {t('Please review your proof carefully. Check all text, colors, and design elements.')}
                    </p>
                  </CardContent>
                </Card>

                {/* Action Buttons */}
                <Card>
                  <CardHeader>
                    <CardTitle>{t('Your Decision')}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {proofStatus === 'approved' || proofStatus === 'rejected' ? (
                      <div className={`p-4 rounded-lg ${
                        proofStatus === 'approved' ? 'bg-green-50' : 'bg-red-50'
                      }`}>
                        <p>
                          {proofStatus === 'approved' 
                            ? t('You have approved this proof') 
                            : t('You have requested changes')}
                        </p>
                      </div>
                    ) : (
                      <>
                        <Button
                          onClick={handleApprove}
                          className="w-full bg-green-600 hover:bg-green-700"
                        >
                          <Check className="w-4 h-4 mr-2" />
                          {t('Approve Design')}
                        </Button>

                        <div className="border-t pt-4">
                          <Label htmlFor="comment" className="mb-2 block">
                            {t('Request Changes')}
                          </Label>
                          <Textarea
                            id="comment"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder={t('Enter your revision request...')}
                            className="w-full mb-4"
                          />
                          <Button
                            variant="outline"
                            onClick={handleReject}
                            className="w-full"
                          >
                            <MessageCircle className="w-4 h-4 mr-2" />
                            {t('Submit Revision Request')}
                          </Button>
                        </div>
                      </>
                    )}

                    {/* Terms Checkbox */}
                    {proofStatus !== 'approved' && proofStatus !== 'rejected' && (
                      <div className="flex items-center space-x-2 border-t pt-4">
                        <Checkbox
                          id="terms"
                          checked={termsAccepted}
                          onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
                        />
                        <Label htmlFor="terms" className="text-sm">
                          {t('I confirm that I have reviewed all details and understand that this approval is final.')}
                        </Label>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Undo Timer */}
                {showUndo && (
                  <Card className="border-green-200 bg-green-50">
                    <CardContent className="pt-6 text-center space-y-2">
                      <p className="text-green-800">
                        {t('You can undo your approval within')} {formatTime(undoTimer)}
                      </p>
                      <Button
                        variant="outline"
                        onClick={handleUndo}
                        className="border-green-600 text-green-700 hover:bg-green-100"
                      >
                        {t('Undo Approval')}
                      </Button>
                    </CardContent>
                  </Card>
                )}

                {/* Comment Thread */}
                {proofStatus === 'rejected' && comment && (
                  <Card>
                    <CardHeader>
                      <CardTitle>{t('Your Comments')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-gray-100 p-4 rounded-lg">
                        <p className="text-gray-600">{comment}</p>
                        <p className="text-xs text-gray-500 mt-2">{new Date().toLocaleString()}</p>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProofView;
