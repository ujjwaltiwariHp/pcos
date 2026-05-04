'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { API_URL, fetchApi } from '@/lib/api';
import { Users, Search, Trash2, Edit, MoreHorizontal, UserCheck, ShieldAlert } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';

export default function AdminUsersPage() {
  const [usersList, setUsersList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchUsers = async () => {
    try {
      const data = await fetchApi('/admin/users');
      setUsersList(data.users);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDeleteUser = async (id: string) => {
    if (!confirm('Are you sure you want to delete this user? This action is permanent.')) return;
    
    try {
      await fetchApi(`/admin/users/${id}`, {
        method: 'DELETE',
      });
      toast.success('User deleted successfully');
      setUsersList(usersList.filter(u => u.id !== id));
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleToggleRole = async (user: any) => {
    const newRole = user.role === 'admin' ? 'user' : 'admin';
    try {
      await fetchApi(`/admin/users/${user.id}`, {
        method: 'PATCH',
        body: JSON.stringify({ role: newRole }),
      });
      toast.success(`User role updated to ${newRole}`);
      setUsersList(usersList.map(u => u.id === user.id ? { ...u, role: newRole } : u));
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const filteredUsers = usersList.filter(u => 
    u.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
    u.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground">User Management</h1>
          <p className="text-muted-foreground text-lg font-medium">Manage system users, roles, and security access.</p>
        </div>
        <div className="relative w-full md:w-96 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <Input 
            placeholder="Search users by name or email..." 
            className="pl-12 h-14 bg-muted/30 border-border/50 rounded-2xl focus:ring-primary/20"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="glass rounded-[2rem] border border-border/50 overflow-hidden shadow-2xl">
        <Table>
          <TableHeader className="bg-muted/30">
            <TableRow className="hover:bg-transparent border-border/50">
              <TableHead className="font-black uppercase tracking-widest text-[10px] py-6 px-8">User</TableHead>
              <TableHead className="font-black uppercase tracking-widest text-[10px] py-6">Status/Role</TableHead>
              <TableHead className="font-black uppercase tracking-widest text-[10px] py-6">Joined Date</TableHead>
              <TableHead className="font-black uppercase tracking-widest text-[10px] py-6 px-8 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              [...Array(5)].map((_, i) => (
                <TableRow key={i} className="border-border/50">
                  <TableCell className="py-6 px-8"><div className="h-10 w-48 bg-muted/50 rounded-lg animate-pulse" /></TableCell>
                  <TableCell className="py-6"><div className="h-6 w-20 bg-muted/50 rounded-lg animate-pulse" /></TableCell>
                  <TableCell className="py-6"><div className="h-6 w-32 bg-muted/50 rounded-lg animate-pulse" /></TableCell>
                  <TableCell className="py-6 px-8 text-right"><div className="h-10 w-20 bg-muted/50 rounded-lg animate-pulse float-right" /></TableCell>
                </TableRow>
              ))
            ) : filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="py-20 text-center text-muted-foreground font-medium">
                  No users found matching your search.
                </TableCell>
              </TableRow>
            ) : filteredUsers.map((user) => (
              <TableRow key={user.id} className="group hover:bg-muted/50 border-border/50 transition-colors">
                <TableCell className="py-6 px-8">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-black text-lg">
                      {user.name?.[0] || 'U'}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-foreground">{user.name}</span>
                      <span className="text-xs text-muted-foreground">{user.email}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-6">
                  <Badge 
                    variant="outline" 
                    className={cn(
                      "text-[10px] uppercase font-black px-3 py-1 border-opacity-50",
                      user.role === 'admin' 
                        ? 'border-primary text-primary bg-primary/5' 
                        : 'border-border/50 text-foreground bg-muted'
                    )}
                  >
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell className="py-6 font-medium text-sm text-muted-foreground">
                  {new Date(user.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                </TableCell>
                <TableCell className="py-6 px-8 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="rounded-xl hover:bg-primary/10 hover:text-primary transition-colors"
                      title={user.role === 'admin' ? "Demote to User" : "Promote to Admin"}
                      onClick={() => handleToggleRole(user)}
                    >
                      {user.role === 'admin' ? <ShieldAlert className="w-5 h-5" /> : <UserCheck className="w-5 h-5" />}
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="rounded-xl hover:bg-destructive/10 hover:text-destructive transition-colors"
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      <Trash2 className="w-5 h-5" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
