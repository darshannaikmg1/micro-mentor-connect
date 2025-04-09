
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { X, Camera, Plus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

const ProfilePage = () => {
  const { user, logout, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [profileImage, setProfileImage] = useState(user?.image || "");
  const [expertise, setExpertise] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState("");
  const [hourlyRate, setHourlyRate] = useState<number | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    // Load profile data from Supabase if user exists
    const fetchProfileData = async () => {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (error) {
          console.error('Error fetching profile:', error);
          return;
        }

        if (data) {
          setName(data.full_name || user.name || "");
          setBio(data.bio || "");
          setProfileImage(user.image || ""); // Keep this from user context or update if needed
          setExpertise(data.expertise || []);
          setHourlyRate(data.hourly_rate || null);
        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchProfileData();
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsLoading(true);

      // Upload image to Supabase storage
      const fileName = `${user.id}-${Date.now()}`;
      const fileExt = file.name.split('.').pop();
      const filePath = `${fileName}.${fileExt}`;

      const { data, error } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (error) {
        throw error;
      }

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      const imageUrl = urlData.publicUrl;
      setProfileImage(imageUrl);

      toast({
        title: "Image uploaded",
        description: "Your profile image has been updated.",
      });
    } catch (error: any) {
      console.error('Error uploading image:', error);
      toast({
        title: "Upload failed",
        description: error.message || "Failed to upload image.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddSkill = () => {
    if (!newSkill.trim()) return;
    
    // Don't add duplicate skills
    if (expertise.includes(newSkill.trim())) {
      toast({
        title: "Skill already exists",
        description: "This skill is already in your profile.",
        variant: "destructive",
      });
      return;
    }
    
    setExpertise([...expertise, newSkill.trim()]);
    setNewSkill("");
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setExpertise(expertise.filter(skill => skill !== skillToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Prepare profile data based on user role
      const profileData: any = {
        id: user.id,
        full_name: name,
        bio: bio,
        updated_at: new Date().toISOString(),
      };
      
      // Add mentor-specific fields if user is a mentor
      if (user.role === 'mentor') {
        profileData.expertise = expertise;
        profileData.hourly_rate = hourlyRate;
      }

      // Update profile in Supabase
      const { error } = await supabase
        .from('profiles')
        .upsert(profileData, { onConflict: 'id' });

      if (error) throw error;

      // Update local user state
      updateUserProfile({
        ...user,
        name: name,
        bio: bio,
        image: profileImage,
      });

      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
      });
      setIsEditing(false);
    } catch (error: any) {
      console.error('Error updating profile:', error);
      toast({
        title: "Update failed",
        description: error.message || "Failed to update profile.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-950 text-white">
      <Navbar />
      <main className="flex-grow py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-900 shadow rounded-lg overflow-hidden border border-gray-800">
            <div className="p-6 sm:p-8">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-white">My Profile</h1>
                {!isEditing && (
                  <Button onClick={() => setIsEditing(true)} className="bg-indigo-600 hover:bg-indigo-700">Edit Profile</Button>
                )}
              </div>

              <form onSubmit={handleSubmit}>
                <div className="mb-8 flex flex-col items-center">
                  <div className="relative mb-4">
                    <Avatar className="h-32 w-32 border-4 border-gray-800 shadow-md">
                      <AvatarImage src={profileImage} alt={name} />
                      <AvatarFallback className="text-3xl bg-indigo-800">{name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    {isEditing && (
                      <div className="absolute bottom-0 right-0">
                        <label
                          htmlFor="profile-image"
                          className="flex items-center justify-center h-8 w-8 rounded-full bg-indigo-600 text-white cursor-pointer"
                        >
                          <Camera size={16} />
                        </label>
                        <input
                          id="profile-image"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleImageUpload}
                          disabled={isLoading}
                        />
                      </div>
                    )}
                  </div>
                  <h2 className="text-xl font-semibold text-white">{name}</h2>
                  <p className="text-indigo-400">{user.role === 'mentor' ? 'Mentor' : 'Mentee'}</p>
                </div>

                <div className="space-y-6">
                  <div>
                    <Label htmlFor="name" className="text-white">Full Name</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      disabled={!isEditing || isLoading}
                      className={!isEditing ? "bg-gray-800 border-gray-700 text-white" : "bg-gray-800 border-gray-700 text-white"}
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-white">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={true} // Email should not be editable
                      className="bg-gray-800 border-gray-700 text-gray-400"
                    />
                  </div>

                  {user.role === 'mentor' && (
                    <>
                      <div>
                        <Label htmlFor="hourlyRate" className="text-white">Hourly Rate ($)</Label>
                        <Input
                          id="hourlyRate"
                          type="number"
                          min="0"
                          value={hourlyRate || ''}
                          onChange={(e) => setHourlyRate(parseFloat(e.target.value) || null)}
                          disabled={!isEditing || isLoading}
                          className={!isEditing ? "bg-gray-800 border-gray-700 text-white" : "bg-gray-800 border-gray-700 text-white"}
                          placeholder="Set your hourly rate"
                        />
                      </div>

                      <div>
                        <Label className="text-white mb-2 block">Expertise & Skills</Label>
                        <div className="flex flex-wrap gap-2 mb-2">
                          {expertise.map((skill, index) => (
                            <Badge 
                              key={index} 
                              className="bg-indigo-900/60 text-white hover:bg-indigo-900 flex items-center"
                            >
                              {skill}
                              {isEditing && (
                                <button 
                                  type="button"
                                  onClick={() => handleRemoveSkill(skill)} 
                                  className="ml-1 text-white hover:text-red-300"
                                >
                                  <X size={14} />
                                </button>
                              )}
                            </Badge>
                          ))}
                        </div>

                        {isEditing && (
                          <div className="flex gap-2 mt-3">
                            <Input
                              value={newSkill}
                              onChange={(e) => setNewSkill(e.target.value)}
                              onKeyDown={handleKeyDown}
                              disabled={isLoading}
                              placeholder="Add a skill (e.g., React, Python)"
                              className="bg-gray-800 border-gray-700 text-white"
                            />
                            <Button 
                              type="button" 
                              onClick={handleAddSkill}
                              size="icon"
                              className="bg-indigo-600 hover:bg-indigo-700"
                            >
                              <Plus size={18} />
                            </Button>
                          </div>
                        )}
                      </div>
                    </>
                  )}

                  <div>
                    <Label htmlFor="bio" className="text-white">Bio</Label>
                    <Textarea
                      id="bio"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      disabled={!isEditing || isLoading}
                      className={!isEditing ? "bg-gray-800 border-gray-700 text-white" : "bg-gray-800 border-gray-700 text-white"}
                      placeholder="Tell us about yourself"
                      rows={4}
                    />
                  </div>

                  {isEditing && (
                    <div className="flex justify-end space-x-3">
                      <Button 
                        variant="outline" 
                        onClick={() => setIsEditing(false)}
                        disabled={isLoading}
                        className="border-gray-700 text-white hover:bg-gray-800"
                      >
                        Cancel
                      </Button>
                      <Button 
                        type="submit"
                        disabled={isLoading}
                        className="bg-indigo-600 hover:bg-indigo-700"
                      >
                        {isLoading ? "Saving..." : "Save Changes"}
                      </Button>
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProfilePage;
