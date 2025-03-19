<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;

class Dentist extends Model
{
    protected $fillable = [
        'user_id',
        'specialization',
        'credentials',
        'bio',
        'office_address',
    ];

    protected $appends = ['available_today']; // Add this line

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function appointments()
    {
        return $this->hasMany(Appointment::class);
    }

    public function schedules()
    {
        return $this->hasMany(Schedule::class);
    }

    // Add this accessor
    public function getAvailableTodayAttribute()
    {
        return Cache::remember("dentist_{$this->id}_availability", now()->addDay(), function() {
            $today = now()->format('l');
            return $this->schedules()
                ->where('dentist_id', $this->id)
                ->whereJsonContains('days_of_week', $today)
                ->exists();
        });
    }
    public function scopeAvailableToday($query)
    {
        return $query->whereHas('appointments', function ($q) {
            $q->whereDate('appointment_date', now()->toDateString());
        });
    }
}