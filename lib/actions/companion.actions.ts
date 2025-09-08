'use server';

import {auth} from "@clerk/nextjs/server";
import {createSupabaseClient} from "@/lib/supabase";
import { revalidatePath } from "next/cache";

// Fallback data for when database is not available
const fallbackCompanions = [
    {
        id: "1",
        name: "Neura the Brainy Explorer",
        subject: "science",
        topic: "Neural Network of the Brain",
        voice: "female",
        style: "casual",
        duration: 45,
        author: "system",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        bookmarked: false
    },
    {
        id: "2",
        name: "Countsy the Number Wizard",
        subject: "maths",
        topic: "Derivatives & Integrals",
        voice: "male",
        style: "formal",
        duration: 30,
        author: "system",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        bookmarked: false
    },
    {
        id: "3",
        name: "Verba the Vocabulary Builder",
        subject: "language",
        topic: "English Literature",
        voice: "female",
        style: "casual",
        duration: 30,
        author: "system",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        bookmarked: false
    },
    {
        id: "4",
        name: "Codey the Logic Hacker",
        subject: "coding",
        topic: "Intro to If-Else Statements",
        voice: "male",
        style: "casual",
        duration: 45,
        author: "system",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        bookmarked: false
    },
    {
        id: "5",
        name: "Memo, the Memory Keeper",
        subject: "history",
        topic: "World Wars: Causes & Consequences",
        voice: "female",
        style: "formal",
        duration: 15,
        author: "system",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        bookmarked: false
    },
    {
        id: "6",
        name: "The Market Maestro",
        subject: "economics",
        topic: "The Basics of Supply & Demand",
        voice: "male",
        style: "formal",
        duration: 10,
        author: "system",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        bookmarked: false
    }
];

const getFallbackCompanions = ({ limit = 10, subject, topic }: GetAllCompanions) => {
    let filtered = fallbackCompanions;
    
    if (subject) {
        filtered = filtered.filter(companion => 
            companion.subject.toLowerCase().includes(subject.toLowerCase())
        );
    }
    
    if (topic) {
        filtered = filtered.filter(companion => 
            companion.topic.toLowerCase().includes(topic.toLowerCase()) ||
            companion.name.toLowerCase().includes(topic.toLowerCase())
        );
    }
    
    return filtered.slice(0, limit);
};

export const createCompanion = async (formData: CreateCompanion) => {
    try {
        const { userId: author } = await auth();
        const supabase = createSupabaseClient();

        const { data, error } = await supabase
            .from('companions')
            .insert({...formData, author })
            .select();

        if(error || !data) {
            console.log('Database error creating companion:', error?.message);
            // Return a mock companion for development
            const mock = {
                id: Date.now().toString(),
                ...formData,
                author: author || 'system',
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
                bookmarked: false
            } as unknown as Companion;
            // Persist mock in fallback store so the detail page can resolve it by id
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore - fallbackCompanions is a local array used for dev-only data
            fallbackCompanions.unshift(mock);
            return mock;
        }

        return data[0];
    } catch (error) {
        console.log('Error creating companion:', error);
        // Return a mock companion for development
        const mock = {
            id: Date.now().toString(),
            ...formData,
            author: 'system',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            bookmarked: false
        } as unknown as Companion;
        // Persist mock in fallback store
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        fallbackCompanions.unshift(mock);
        return mock;
    }
}

export const getAllCompanions = async ({ limit = 10, page = 1, subject, topic }: GetAllCompanions) => {
    try {
        const supabase = createSupabaseClient();

        let query = supabase.from('companions').select();

        if(subject && topic) {
            query = query.ilike('subject', `%${subject}%`)
                .or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`)
        } else if(subject) {
            query = query.ilike('subject', `%${subject}%`)
        } else if(topic) {
            query = query.or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`)
        }

        query = query.range((page - 1) * limit, page * limit - 1);

        const { data: companions, error } = await query;

        if(error) {
            console.log('Database error, returning fallback data:', error.message);
            return getFallbackCompanions({ limit, subject, topic });
        }

        return companions || [];
    } catch (error) {
        console.log('Error fetching companions, returning fallback data:', error);
        return getFallbackCompanions({ limit, subject, topic });
    }
}

export const getCompanion = async (id: string) => {
    try {
        const supabase = createSupabaseClient();

        const { data, error } = await supabase
            .from('companions')
            .select()
            .eq('id', id);

        if(error) {
            console.log('Database error, returning fallback companion:', error.message);
            return fallbackCompanions.find(c => c.id === id) || fallbackCompanions[0];
        }

        return data[0] || fallbackCompanions.find(c => c.id === id) || fallbackCompanions[0];
    } catch (error) {
        console.log('Error fetching companion, returning fallback:', error);
        return fallbackCompanions.find(c => c.id === id) || fallbackCompanions[0];
    }
}

export const addToSessionHistory = async (companionId: string) => {
    try {
        const { userId } = await auth();
        const supabase = createSupabaseClient();
        const { data, error } = await supabase.from('session_history')
            .insert({
                companion_id: companionId,
                user_id: userId,
            })

        if(error) {
            console.log('Database error adding to session history:', error.message);
            return null;
        }

        return data;
    } catch (error) {
        console.log('Error adding to session history:', error);
        return null;
    }
}

export const getRecentSessions = async (limit = 10) => {
    try {
        const supabase = createSupabaseClient();
        const { data, error } = await supabase
            .from('session_history')
            .select(`companions:companion_id (*)`)
            .order('created_at', { ascending: false })
            .limit(limit)

        if(error) {
            console.log('Database error, returning fallback sessions:', error.message);
            return fallbackCompanions.slice(0, limit);
        }

        return data.map(({ companions }) => companions) || [];
    } catch (error) {
        console.log('Error fetching recent sessions, returning fallback:', error);
        return fallbackCompanions.slice(0, limit);
    }
}

export const getUserSessions = async (userId: string, limit = 10) => {
    try {
        const supabase = createSupabaseClient();
        const { data, error } = await supabase
            .from('session_history')
            .select(`companions:companion_id (*)`)
            .eq('user_id', userId)
            .order('created_at', { ascending: false })
            .limit(limit)

        if(error) {
            console.log('Database error, returning fallback user sessions:', error.message);
            return fallbackCompanions.slice(0, limit);
        }

        return data.map(({ companions }) => companions) || [];
    } catch (error) {
        console.log('Error fetching user sessions, returning fallback:', error);
        return fallbackCompanions.slice(0, limit);
    }
}

export const getUserCompanions = async (userId: string) => {
    try {
        const supabase = createSupabaseClient();
        const { data, error } = await supabase
            .from('companions')
            .select()
            .eq('author', userId)

        if(error) {
            console.log('Database error, returning fallback user companions:', error.message);
            return [];
        }

        return data || [];
    } catch (error) {
        console.log('Error fetching user companions, returning fallback:', error);
        return [];
    }
}

export const newCompanionPermissions = async () => {
    try {
        const { userId, has } = await auth();
        const supabase = createSupabaseClient();

        let limit = 0;

        if(has({ plan: 'pro' })) {
            return true;
        } else if(has({ feature: "3_companion_limit" })) {
            limit = 3;
        } else if(has({ feature: "10_companion_limit" })) {
            limit = 10;
        }

        const { data, error } = await supabase
            .from('companions')
            .select('id', { count: 'exact' })
            .eq('author', userId)

        if(error) {
            console.log('Database error checking permissions:', error.message);
            return true; // Allow creation in development
        }

        const companionCount = data?.length || 0;

        if(companionCount >= limit) {
            return false
        } else {
            return true;
        }
    } catch (error) {
        console.log('Error checking companion permissions:', error);
        return true; // Allow creation in development
    }
}

// Bookmarks
export const addBookmark = async (companionId: string, path: string) => {
  try {
    const { userId } = await auth();
    if (!userId) return;
    const supabase = createSupabaseClient();
    const { data, error } = await supabase.from("bookmarks").insert({
      companion_id: companionId,
      user_id: userId,
    });
    if (error) {
      console.log('Database error adding bookmark:', error.message);
      revalidatePath(path);
      return null;
    }
    // Revalidate the path to force a re-render of the page
    revalidatePath(path);
    return data;
  } catch (error) {
    console.log('Error adding bookmark:', error);
    revalidatePath(path);
    return null;
  }
};

export const removeBookmark = async (companionId: string, path: string) => {
  try {
    const { userId } = await auth();
    if (!userId) return;
    const supabase = createSupabaseClient();
    const { data, error } = await supabase
      .from("bookmarks")
      .delete()
      .eq("companion_id", companionId)
      .eq("user_id", userId);
    if (error) {
      console.log('Database error removing bookmark:', error.message);
      revalidatePath(path);
      return null;
    }
    revalidatePath(path);
    return data;
  } catch (error) {
    console.log('Error removing bookmark:', error);
    revalidatePath(path);
    return null;
  }
};

// It's almost the same as getUserCompanions, but it's for the bookmarked companions
export const getBookmarkedCompanions = async (userId: string) => {
  try {
    const supabase = createSupabaseClient();
    const { data, error } = await supabase
      .from("bookmarks")
      .select(`companions:companion_id (*)`) // Notice the (*) to get all the companion data
      .eq("user_id", userId);
    
    if (error) {
      console.log('Database error, returning fallback bookmarks:', error.message);
      return [];
    }
    
    // We don't need the bookmarks data, so we return only the companions
    return data.map(({ companions }) => companions) || [];
  } catch (error) {
    console.log('Error fetching bookmarked companions, returning fallback:', error);
    return [];
  }
};