<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Dentist extends Model
{
    
    protected $fillable = [
        'user_id',
        'specialization',
        'credentials',
        'bio',
        'office_address',
    ];

    public function user()
    {
        return $this->belongsTo(User::class , 'user_id');
    }

    public function appointments()
    {
        return $this->hasMany(Appointment::class, 'dentist_id');
    }

    public function schedules()
    {
        return $this->hasMany(Schedule::class, 'dentist_id');
    }

}
