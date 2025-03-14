<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Schedule extends Model
{
    
    protected $fillable = ['dentist_id', 'days_of_week', 'start_time', 'end_time', 'break_start', 'break_end'];


    protected $casts = [
        'days_of_week' => 'array',
    ];
    public function dentistInfo()
    {
        return $this->belongsTo(Dentist::class);
    }

    public function dentist()
    {
        return $this->belongsTo(User::class, 'dentist_id');
    }

    public function isAvailableOnDay($day)
    {
        return in_array($day, $this->days_of_week);
    }}
