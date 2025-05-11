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
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useTranslation } from 'react-i18next';

type ProofViewProps = {
  storeName: string;
  orderId: string;
};

const ProofView = ({ storeName, orderId }: ProofViewProps) => {
  const { t, i18n } = useTranslation();
  const [comment, setComment] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showUndo, setShowUndo] = useState(false);
  const [undoTimer, setUndoTimer] = useState(300); // 5 minutes in seconds
  const [proofStatus, setProofStatus] = useState<'waiting' | 'approved' | 'rejected' | 'sent'>('sent');

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
    }
  }, [showUndo, undoTimer]);

  const handleApprove = () => {
    setProofStatus('approved');
    setShowUndo(true);
    setUndoTimer(300);
  };

  const handleReject = () => {
    setProofStatus('rejected');
  };

  const handleUndo = () => {
    setProofStatus('sent');
    setShowUndo(false);
    setUndoTimer(300);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle>{t('Proof Review')}</CardTitle>
            <CardDescription>
              {t('Order')} #{orderId} - {storeName}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {/* Status Banner */}
              <div className={`p-4 rounded-lg ${
                proofStatus === 'approved' ? 'bg-green-100 text-green-800' :
                proofStatus === 'rejected' ? 'bg-red-100 text-red-800' :
                proofStatus === 'waiting' ? 'bg-yellow-100 text-yellow-800' :
                'bg-blue-100 text-blue-800'
              }`}>
                <p className="text-center font-medium">
                  {proofStatus === 'approved' ? t('Proof Approved') :
                   proofStatus === 'rejected' ? t('Changes Requested') :
                   proofStatus === 'waiting' ? t('Waiting for Proof') :
                   t('Proof Sent for Review')}
                </p>
              </div>

              {/* Proof Image */}
              <div className="relative aspect-square max-w-2xl mx-auto">
                <img
                  src="/proofs/sample.jpg"
                  alt="Proof"
                  className="w-full h-full object-contain rounded-lg shadow-lg"
                />
              </div>

              {/* Seller Message */}
              <div className="bg-gray-100 p-4 rounded-lg">
                <h3 className="font-medium mb-2">{t('Message from Seller')}</h3>
                <p className="text-gray-600">
                  {t('Please review your proof carefully. Check all text, colors, and design elements.')}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-4">
                <Button
                  onClick={handleApprove}
                  disabled={proofStatus === 'approved' || proofStatus === 'rejected'}
                  className="w-full"
                >
                  {t('Approve Design')}
                </Button>

                <div className="space-y-4">
                  <Textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder={t('Enter your revision request...')}
                    className="w-full"
                  />
                  <Button
                    variant="outline"
                    onClick={handleReject}
                    disabled={proofStatus === 'approved' || proofStatus === 'rejected'}
                    className="w-full"
                  >
                    {t('Request Changes')}
                  </Button>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms"
                    checked={termsAccepted}
                    onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
                  />
                  <Label htmlFor="terms" className="text-sm">
                    {t('I confirm that I have reviewed all details and understand that this approval is final.')}
                  </Label>
                </div>
              </div>

              {/* Undo Timer */}
              {showUndo && (
                <div className="text-center space-y-2">
                  <p className="text-sm text-gray-600">
                    {t('You can undo your approval within')} {formatTime(undoTimer)}
                  </p>
                  <Button
                    variant="outline"
                    onClick={handleUndo}
                    className="text-sm"
                  >
                    {t('Undo Approval')}
                  </Button>
                </div>
              )}

              {/* Comment Thread */}
              {proofStatus === 'rejected' && comment && (
                <div className="mt-8 space-y-4">
                  <h3 className="font-medium">{t('Your Comments')}</h3>
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <p className="text-gray-600">{comment}</p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProofView; 