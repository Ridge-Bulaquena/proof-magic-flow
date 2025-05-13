
import { useState } from 'react';
import { PlusCircle, UserPlus, Trash2, User, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from '@/hooks/use-toast';

type TeamMember = {
  id: string;
  email: string;
  role: 'admin' | 'artist' | 'va' | 'support';
  permissions: {
    view: boolean;
    edit: boolean;
    upload: boolean;
  };
};

type TeamInviteStepProps = {
  storeData: any;
  updateStoreData: (data: any) => void;
};

const TeamInviteStep = ({ storeData, updateStoreData }: TeamInviteStepProps) => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(storeData.teamMembers || []);
  const [newEmail, setNewEmail] = useState('');
  const [newRole, setNewRole] = useState<'admin' | 'artist' | 'va' | 'support'>('artist');
  const { toast } = useToast();

  const handleAddTeamMember = () => {
    if (!newEmail) {
      toast({
        title: "Email Required",
        description: "Please enter an email address",
        variant: "destructive",
      });
      return;
    }

    if (!newEmail.includes('@')) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    const newMember: TeamMember = {
      id: Date.now().toString(),
      email: newEmail,
      role: newRole,
      permissions: {
        view: true,
        edit: newRole === 'admin' || newRole === 'artist',
        upload: newRole === 'admin' || newRole === 'artist' || newRole === 'va',
      }
    };

    const updatedMembers = [...teamMembers, newMember];
    setTeamMembers(updatedMembers);
    updateStoreData({ teamMembers: updatedMembers });
    setNewEmail('');
    
    toast({
      title: "Team Member Added",
      description: `Invitation will be sent to ${newEmail}`,
    });
  };

  const handleRemoveTeamMember = (id: string) => {
    const updatedMembers = teamMembers.filter(member => member.id !== id);
    setTeamMembers(updatedMembers);
    updateStoreData({ teamMembers: updatedMembers });
    
    toast({
      title: "Team Member Removed",
    });
  };

  const handleTogglePermission = (id: string, permission: 'view' | 'edit' | 'upload') => {
    const updatedMembers = teamMembers.map(member => {
      if (member.id === id) {
        return {
          ...member,
          permissions: {
            ...member.permissions,
            [permission]: !member.permissions[permission]
          }
        };
      }
      return member;
    });
    
    setTeamMembers(updatedMembers);
    updateStoreData({ teamMembers: updatedMembers });
  };

  const getRoleBadgeClass = (role: string) => {
    switch(role) {
      case 'admin': return 'bg-purple-100 text-purple-800';
      case 'artist': return 'bg-blue-100 text-blue-800';
      case 'va': return 'bg-green-100 text-green-800';
      case 'support': return 'bg-amber-100 text-amber-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold">Invite Team Members</h2>
        <p className="text-gray-500">
          Add your team members and set their permissions
        </p>
      </div>

      <div className="space-y-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex-1">
                <Label htmlFor="teamEmail" className="sr-only">Team Member Email</Label>
                <Input
                  id="teamEmail"
                  placeholder="Email address"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="teamRole" className="sr-only">Role</Label>
                <Select 
                  value={newRole} 
                  onValueChange={(value: 'admin' | 'artist' | 'va' | 'support') => setNewRole(value)}
                >
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="artist">Artist</SelectItem>
                    <SelectItem value="va">VA/Assistant</SelectItem>
                    <SelectItem value="support">Support</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleAddTeamMember}>
                <UserPlus className="h-4 w-4 mr-2" />
                Invite
              </Button>
            </div>

            <div className="text-xs text-gray-500 mb-6">
              <h4 className="font-medium mb-1">Role descriptions:</h4>
              <ul className="space-y-1">
                <li><span className="font-medium">Admin:</span> Full access to all features and settings</li>
                <li><span className="font-medium">Artist:</span> Can upload proofs and edit orders</li>
                <li><span className="font-medium">VA/Assistant:</span> Can upload proofs and manage orders</li>
                <li><span className="font-medium">Support:</span> View-only access, can respond to customers</li>
              </ul>
            </div>

            {teamMembers.length > 0 ? (
              <div className="space-y-4">
                <h3 className="font-medium">Team Members ({teamMembers.length})</h3>
                <div className="space-y-3">
                  {teamMembers.map((member) => (
                    <div key={member.id} className="p-3 border rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                          <User className="h-4 w-4 text-gray-600" />
                        </div>
                        <div>
                          <div className="font-medium">{member.email}</div>
                          <div className={`text-xs px-2 py-0.5 rounded-full inline-block ${getRoleBadgeClass(member.role)}`}>
                            {member.role.charAt(0).toUpperCase() + member.role.slice(1)}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-3 justify-end">
                        <div className="flex items-center gap-1">
                          <Label htmlFor={`view-${member.id}`} className="text-xs">View</Label>
                          <Switch
                            id={`view-${member.id}`}
                            checked={member.permissions.view}
                            onCheckedChange={() => handleTogglePermission(member.id, 'view')}
                            disabled={member.role === 'admin'}
                          />
                        </div>
                        <div className="flex items-center gap-1">
                          <Label htmlFor={`edit-${member.id}`} className="text-xs">Edit</Label>
                          <Switch
                            id={`edit-${member.id}`}
                            checked={member.permissions.edit}
                            onCheckedChange={() => handleTogglePermission(member.id, 'edit')}
                            disabled={member.role === 'admin'}
                          />
                        </div>
                        <div className="flex items-center gap-1">
                          <Label htmlFor={`upload-${member.id}`} className="text-xs">Upload</Label>
                          <Switch
                            id={`upload-${member.id}`}
                            checked={member.permissions.upload}
                            onCheckedChange={() => handleTogglePermission(member.id, 'upload')}
                            disabled={member.role === 'admin'}
                          />
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleRemoveTeamMember(member.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center p-8 border border-dashed rounded-lg">
                <Users className="h-10 w-10 text-gray-300 mx-auto mb-3" />
                <h3 className="text-gray-500 font-medium mb-1">No team members yet</h3>
                <p className="text-gray-400 text-sm">
                  Add team members to collaborate on proofs
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="p-4 bg-blue-50 rounded-lg text-sm">
          <h3 className="font-medium text-blue-800 mb-2 flex items-center gap-2">
            <PlusCircle className="h-4 w-4" />
            Pro Tip: Team Collaboration
          </h3>
          <p className="text-blue-700">
            Adding team members helps streamline your workflow. Artists can upload proofs, VAs can manage orders, 
            and administrators have full control. You can always add more team members later.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TeamInviteStep;
